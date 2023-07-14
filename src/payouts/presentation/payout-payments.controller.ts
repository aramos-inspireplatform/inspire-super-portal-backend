import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindPeriodPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-period-payout-payments.output';
import { FindPeriodPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-period-payout-payments.input.dto';
import { ISearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/contracts/search-all-payments.query.contract';
import { IFindPeriodPayoutPaymentsQuery } from '~/payouts/application/queries/contracts/find-period-payments.query.contract';
import { SearchAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/search-all-payout-payments.input.dto';
import { SearchAllPayoutPaymentArrayOutput } from '~/payouts/presentation/dtos/responses/search-all-payout-payment-array.output';

@Controller('/payouts/payments')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_PERIOD_PAYMENTS_QUERY)
    private readonly findPeriodPayoutPaymentsQuery: IFindPeriodPayoutPaymentsQuery,

    @Inject(PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_QUERY)
    private readonly searchAllPayoutsPaymentsQuery: ISearchAllPayoutPaymentsQuery,
  ) {}

  @Get('/period')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindPeriodPayoutPaymentsOutputDto })
  async findPeriod(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindPeriodPayoutPaymentsInputDto,
  ) {
    const payments = await this.findPeriodPayoutPaymentsQuery.execute({
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

  @Get('/period/select-all')
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
}
