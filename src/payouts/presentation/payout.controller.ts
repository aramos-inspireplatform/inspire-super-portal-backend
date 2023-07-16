import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';
import { IFindOneTenantPayoutQuery } from '~/payouts/application/queries/contracts/find-one-tenant-payout.query.contract';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPaymentsPeriodPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payments-period-paged.output';
import { FindOneTenantPayoutOutput } from '~/payouts/presentation/dtos/responses/find-one-tenant-payout.output';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { FindOnePayoutSummaryPreviewInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary-preview.input.dto';
import { FindOnePayoutSummaryPreviewOutputDto } from '~/payouts/presentation/dtos/responses/find-one-payout-summary-preview.output';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';
import { FindOnePayoutSummaryInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary.input.dto';
import { FindOnePayoutSummaryQuery } from '~/payouts/application/queries/find-one-payout-summary.query';
import { FindOnePayoutSummaryOutputDto } from '~/payouts/presentation/dtos/responses/find-one-payout-summary.output';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { FindOnePayoutInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout.input.dto';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutsQuery: IFindAllTenantPayoutsQuery,
    @Inject(PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_QUERY)
    private readonly findOneTenantPayoutQuery: IFindOneTenantPayoutQuery,
    @Inject(PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_QUERY)
    private readonly findOnePayoutSummaryQuery: FindOnePayoutSummaryQuery,
    @Inject(PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_PREVIEW_QUERY)
    private readonly findOnePayoutSummaryPreviewQuery: FindOnePayoutSummaryPreviewQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPaymentsPeriodPagedOutputDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const payouts = await this.findAllTenantPayoutsQuery.execute({
      pagination: new PaginationInput({
        keywords: searchParams.keywords,
        page: searchParams.page,
        size: searchParams.pagesize,
        sort: searchParams.sortby,
      }),
    });

    return payouts;
  }

  @Get('/:payoutId')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindOneTenantPayoutOutput })
  async findOne(
    @Req() request: FastifyRequest,
    @UserAuth() authUser: UserAuthDto,
    @Param('payoutId') payoutId: string,
    @Query() inputDto: FindOnePayoutInputDto,
  ) {
    const payout = await this.findOneTenantPayoutQuery.execute({
      authUser: authUser,
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      payoutId: payoutId,
    });

    return payout;
  }

  @Get('/:payoutId/summary')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindOnePayoutSummaryOutputDto })
  async findOneSummary(
    @Req() request: FastifyRequest,
    @Param('payoutId', ParseUUIDPipe) payoutId: string,
    @Query() inputDto: FindOnePayoutSummaryInputDto,
  ) {
    const payoutSummary = await this.findOnePayoutSummaryQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      payoutId,
    });

    return payoutSummary;
  }

  @Post('/summary/preview')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindOnePayoutSummaryPreviewOutputDto })
  async findOneSummaryPreview(
    @Req() request: FastifyRequest,
    @Body() inputDto: FindOnePayoutSummaryPreviewInputDto,
  ) {
    const payoutSummaryPreview =
      await this.findOnePayoutSummaryPreviewQuery.execute({
        accessToken: request.headers.authorization,
        gTenantId: inputDto.gTenantId,
        payments: inputDto.payments,
        adjustmentFees: inputDto.adjustmentFees,
        payoutId: inputDto.payoutId,
      });

    return payoutSummaryPreview;
  }
}
