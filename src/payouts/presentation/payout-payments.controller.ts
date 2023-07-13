import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutPaymentsQuery } from '~/payouts/application/queries/find-all-payout-payments.query';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { FindAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments.input.dto';

@Controller('/payouts/payments')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYMENTS_QUERY)
    private readonly findAllPayoutPaymentsQuery: FindAllPayoutPaymentsQuery,
  ) {}

  @Get('/period')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsOutputDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPayoutPaymentsInputDto,
  ) {
    const payments = await this.findAllPayoutPaymentsQuery.execute({
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
}
