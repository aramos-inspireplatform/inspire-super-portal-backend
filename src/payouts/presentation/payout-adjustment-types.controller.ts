import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllPayoutAdjustmentTypesQuery } from '~/payouts/application/queries/contracts/find-all-payout-adjustment-types.query.contract';
import { FindAllPayoutAdjustmentTypesInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-adjustment-types.input.dto';
import { FindAllPayoutAdjustmentTypesOutput } from '~/payouts/presentation/dtos/responses/find-all-payout-adjustment-types.output';

@Controller('/payouts/adjustment-types')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutAdjustmentTypesController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_QUERY)
    private readonly findAllPayoutAdjustmentTypesQuery: IFindAllPayoutAdjustmentTypesQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutAdjustmentTypesOutput, isArray: true })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() inputDto: FindAllPayoutAdjustmentTypesInputDto,
  ) {
    const payments = await this.findAllPayoutAdjustmentTypesQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
    });

    return payments;
  }
}
