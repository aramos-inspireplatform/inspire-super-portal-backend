import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPaymentsPeriodPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payments-period-paged.output';
import { FindAllPaymentsPeriodPagedInputDto } from '~/payouts/presentation/dtos/requests/find-period-payout-payments.input.dto';
import { IFindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/contracts/find-all-payout-payments-paged.query.contract';
import { FindAllPayoutPaymentsPagedInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments-paged.input.dto';
import { FindAllPayoutPaymentsPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments-paged.output';
import { ISearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/contracts/search-all-payments.query.contract';
import { SearchAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/search-all-payout-payments.input.dto';
import { SearchAllPayoutPaymentArrayOutput } from '~/payouts/presentation/dtos/responses/search-all-payout-payment-array.output';
import { IFindAllPaymentsPeriodPagedQuery } from '~/payouts/application/queries/contracts/find-all-payments-period-paged.query.contract';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_PAGED_QUERY)
    private readonly findAllPaymentsPeriodPagedQuery: IFindAllPaymentsPeriodPagedQuery,
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYOUT_PAYMENTS_PAGED_QUERY)
    private readonly findAllPayoutPaymentsPagedQuery: IFindAllPayoutPaymentsPagedQuery,
    @Inject(PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_QUERY)
    private readonly searchAllPayoutsPaymentsQuery: ISearchAllPayoutPaymentsQuery,
  ) {}

  @Get('/payments/period')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPaymentsPeriodPagedOutputDto })
  async findPeriodPeriod(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPaymentsPeriodPagedInputDto,
  ) {
    const payments = await this.findAllPaymentsPeriodPagedQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      settlementCurrencyIsoCode: inputDto.settlementCurrencyIsoCode,
      payoutId: inputDto.payoutId,
      pagination: {
        ...inputDto,
      },
    });

    return payments;
  }

  @Get('/payments/period/select-all')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: SearchAllPayoutPaymentArrayOutput })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() inputDto: SearchAllPayoutPaymentsInputDto,
  ) {
    const payments = await this.searchAllPayoutsPaymentsQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      settlementCurrencyIsoCode: inputDto.settlementCurrencyIsoCode,
      payoutId: inputDto.payoutId,
    });

    return payments;
  }

  @Get('/:payoutId/payments')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsPagedOutputDto })
  async findAllPayout(
    @Req() request: FastifyRequest,
    @Param('payoutId', ParseUUIDPipe) payoutId: string,
    @Query() inputDto: FindAllPayoutPaymentsPagedInputDto,
  ) {
    const payments = await this.findAllPayoutPaymentsPagedQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      payoutId: payoutId,
      pagination: {
        ...inputDto,
      },
    });

    return payments;
  }
}
