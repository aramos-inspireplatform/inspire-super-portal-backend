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
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { IFindAllTenantPayoutsPagedQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts-paged.query.contract';
import { IFindOneTenantPayoutQuery } from '~/payouts/application/queries/contracts/find-one-tenant-payout.query.contract';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';
import { FindOnePayoutSummaryQuery } from '~/payouts/application/queries/find-one-payout-summary.query';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { CreatePayoutCommand } from '~/payouts/application/commands';
import {
  CreatePayoutOutputDto,
  FindAllTenantPayoutsPagedOutputDto,
  FindOnePayoutSummaryOutputDto,
  FindOnePayoutSummaryPreviewOutputDto,
  FindOneTenantPayoutOutput,
} from '~/payouts/presentation/dtos/responses/payouts';
import {
  CreatePayoutInputDto,
  CreatePayoutParamsDto,
  FindOnePayoutInputDto,
  FindOnePayoutSummaryInputDto,
  FindOnePayoutSummaryPreviewInputDto,
} from '~/payouts/presentation/dtos/requests/payouts';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_TENANT_PAYOUT_PAGED)
    private readonly findAllTenantPayoutsPagedQuery: IFindAllTenantPayoutsPagedQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ONE_TENANT_PAYOUT)
    private readonly findOneTenantPayoutQuery: IFindOneTenantPayoutQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ONE_PAYOUT_SUMMARY)
    private readonly findOnePayoutSummaryQuery: FindOnePayoutSummaryQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ONE_PAYOUT_SUMMARY_PREVIEW)
    private readonly findOnePayoutSummaryPreviewQuery: FindOnePayoutSummaryPreviewQuery,
    @Inject(PayoutProvidersSymbols.Commands.CREATE_PAYOUT)
    private readonly createPayoutCommand: CreatePayoutCommand,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllTenantPayoutsPagedOutputDto })
  async findAllPaged(
    @Req() request: FastifyRequest,
    @UserAuth() userAuth: UserAuthDto,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const payouts = await this.findAllTenantPayoutsPagedQuery.execute({
      userAuth: userAuth,
      paginationInput: new PaginationInput({
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
    @UserAuth() userAuth: UserAuthDto,
    @Param('payoutId') payoutId: string,
    @Query() inputDto: FindOnePayoutInputDto,
  ) {
    const payout = await this.findOneTenantPayoutQuery.execute({
      userAuth: userAuth,
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

  @Put(':payoutId?')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: CreatePayoutOutputDto })
  async create(
    @Req() request: FastifyRequest,
    @Param() { payoutId }: CreatePayoutParamsDto,
    @Body() inputDto: CreatePayoutInputDto,
  ) {
    return this.createPayoutCommand.execute({
      payoutId,
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      command: inputDto.command,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      selectedPayments: inputDto.selectedPayments,
      adjustmentFees: inputDto.adjustmentFees,
      selectAllPayments: inputDto.selectAllPayments,
    });
  }
}
