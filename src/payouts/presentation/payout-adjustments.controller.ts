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
import { IFindAllPayoutAdjustmentsQuery } from '~/payouts/application/queries/contracts/find-all-payout-adjustments.query.contract';
import { FindAllPayoutAdjustmentsOutput } from '~/payouts/presentation/dtos/responses/adjustments';
import { FindAllPayoutAdjustmentsInputDto } from '~/payouts/presentation/dtos/requests/adjustments';

@Controller('/payouts/:payoutId/adjustments')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutAdjustmentsController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_PAYOUT_ADJUSTMENTS_QUERY)
    private readonly findAllPayoutAdjustmentsQuery: IFindAllPayoutAdjustmentsQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutAdjustmentsOutput, isArray: true })
  async findAll(
    @Req() request: FastifyRequest,
    @Param('payoutId', ParseUUIDPipe) payoutId: string,
    @Query() inputDto: FindAllPayoutAdjustmentsInputDto,
  ) {
    const payments = await this.findAllPayoutAdjustmentsQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      payoutId,
    });

    return payments;
  }
}
