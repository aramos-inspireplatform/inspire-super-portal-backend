import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { FindAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments.input.dto';
import { IFindAllTenantPayoutQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutPaymentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutQuery: IFindAllTenantPayoutQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsOutputDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPayoutPaymentsInputDto,
  ) {
    const payments = await this.findAllTenantPayoutQuery.execute({});

    return payments;
  }
}
