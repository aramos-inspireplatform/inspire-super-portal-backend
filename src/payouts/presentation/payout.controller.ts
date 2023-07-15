import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';
import { IFindOnePaymentsPayoutQuery } from '~/payouts/application/queries/contracts/find-one-payments-payout.query.contract';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindOnePayoutSummaryPreviewInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary-preview.input.dto';
import { FindAllPaymentsPeriodPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payments-period-paged.output';
import { FindOnePaymentsPayoutOutput } from '~/payouts/presentation/dtos/responses/find-one-payments-payout.output';
import { PreviewPayoutSummaryOutputDto } from '~/payouts/presentation/dtos/responses/preview-payout-summary.output';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutsQuery: IFindAllTenantPayoutsQuery,

    @Inject(PayoutProvidersSymbols.FIND_ONE_PAYMENTS_PAYOUT_QUERY)
    private readonly findOnePaymentsPayoutQuery: IFindOnePaymentsPayoutQuery,
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

  @Post('/summary/preview')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: PreviewPayoutSummaryOutputDto })
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

  @Get('/:payoutId')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindOnePaymentsPayoutOutput })
  async findOne(
    @UserAuth() authUser: UserAuthDto,
    @Param('payoutId') payoutId: string,
  ) {
    const tenantBalance = await this.findOnePaymentsPayoutQuery.execute({
      authUser: authUser,
      payoutId: payoutId,
    });

    return tenantBalance;
  }
}
