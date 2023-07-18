import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPaymentsPeriodPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payments-period-paged.output';
import { FindAllPaymentsPeriodPagedInputDto } from '~/payouts/presentation/dtos/requests/find-all-payments-period-paged.input.dto';
import { IFindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/contracts/find-all-payout-payments-paged.query.contract';
import { FindAllPayoutPaymentsPagedInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments-paged.input.dto';
import { FindAllPayoutPaymentsPagedOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments-paged.output';
import { IFindAllPaymentsPeriodQuery } from '~/payouts/application/queries/contracts/find-all-payments-period.query.contract';
import { FindAllPaymentsPeriodInputDto } from '~/payouts/presentation/dtos/requests/find-all-payments-period.input.dto';
import { FindAllPaymentsPeriodOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payments-period.output';
import { IFindAllPaymentsPeriodPagedQuery } from '~/payouts/application/queries/contracts/find-all-payments-period-paged.query.contract';
import { CreatePayoutBexsInputDto } from '~/payouts/presentation/dtos/requests/create-payout-bexs.input';
import { ICreatePayoutBexsQuery } from '~/payouts/application/queries/contracts/create-payout-bexs.query.contract';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_PAGED_QUERY)
    private readonly findAllPaymentsPeriodPagedQuery: IFindAllPaymentsPeriodPagedQuery,
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_QUERY)
    private readonly findAllPaymentsPeriodQuery: IFindAllPaymentsPeriodQuery,
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYOUT_PAYMENTS_PAGED_QUERY)
    private readonly findAllPayoutPaymentsPagedQuery: IFindAllPayoutPaymentsPagedQuery,
    @Inject(PayoutProvidersSymbols.CREATE_PAYOUT_BEXS_QUERY)
    private readonly createPayoutBexsQuery: ICreatePayoutBexsQuery,
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

  @Post('/payments/bexs')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async createPayoutBexs(
    @Req() request: FastifyRequest,
    @Query() inputDto: CreatePayoutBexsInputDto,
  ) {
    const file = await request.file({
      limits: { fileSize: 1024 * 1024 * 5 }, //Limit 5mb
    });

    if (!file) {
      throw new BadRequestException('File is required');
    }
    const buffer = await file.toBuffer();

    const response = await this.createPayoutBexsQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      file: buffer,
    });
    return response;
  }
}
