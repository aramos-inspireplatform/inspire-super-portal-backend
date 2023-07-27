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
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IFindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/contracts/find-all-payout-payments-paged.query.contract';
import { IFindAllPaymentsPeriodQuery } from '~/payouts/application/queries/contracts/find-all-payments-period.query.contract';
import { IFindAllPaymentsPeriodPagedQuery } from '~/payouts/application/queries/contracts/find-all-payments-period-paged.query.contract';
import {
  FindAllPaymentsPeriodOutputDto,
  FindAllPaymentsPeriodPagedOutputDto,
  FindAllPayoutPaymentsPagedOutputDto,
} from '~/payouts/presentation/dtos/responses/payments';
import {
  FindAllPaymentsPeriodInputDto,
  FindAllPaymentsPeriodPagedInputDto,
  FindAllPayoutPaymentsPagedInputDto,
} from '~/payouts/presentation/dtos/requests/payments';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_PAYMENTS_PERIOD_PAGED)
    private readonly findAllPaymentsPeriodPagedQuery: IFindAllPaymentsPeriodPagedQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_PAYMENTS_PERIOD)
    private readonly findAllPaymentsPeriodQuery: IFindAllPaymentsPeriodQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_PAYOUT_PAYMENTS_PAGED)
    private readonly findAllPayoutPaymentsPagedQuery: IFindAllPayoutPaymentsPagedQuery,
  ) {}

  @Get('/payments/period')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPaymentsPeriodPagedOutputDto })
  async findAllPeriodPaged(
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
  @ApiOkResponse({ type: FindAllPaymentsPeriodOutputDto, isArray: true })
  async findAllPeriod(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPaymentsPeriodInputDto,
  ) {
    const payments = await this.findAllPaymentsPeriodQuery.execute({
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
  async findAllPayoutPaged(
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
