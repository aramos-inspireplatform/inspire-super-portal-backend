import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindPeriodPayoutPaymentsQuery } from '~/payouts/application/queries/find-period-payout-payments.query';
import { FindPeriodPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-period-payout-payments.output';
import { FindPeriodPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-period-payout-payments.input.dto';
import { FindAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments.input.dto';
import { PaginationInput } from '~/shared/application/services/pagination';
import { FindAllPayoutPaymentsQuery } from '~/payouts/application/queries/find-all-payout-payments.query';

@Controller('/payouts/payments')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_PERIOD_PAYMENTS_QUERY)
    private readonly findPeriodPayoutPaymentsQuery: FindPeriodPayoutPaymentsQuery,

    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYMENTS_QUERY)
    private readonly findAllPeriodPayoutsPaymentsQuery: FindAllPayoutPaymentsQuery,
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

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse()
  async findAll(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPayoutPaymentsInputDto,
  ) {
    const payments = await this.findAllPeriodPayoutsPaymentsQuery.execute({
      pagination: new PaginationInput({
        keywords: inputDto.keywords,
        page: inputDto.page,
        size: inputDto.pagesize,
        sort: inputDto.sortby,
      }),
    });
    return payments;
  }
}
