import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { ReconcileStripeInputDto } from '~/payouts/presentation/dtos/requests/reconcile-stripe.input.dto';
import { IReconcileStripeCommand } from '~/payouts/application/commands/contracts/reconcile-stripe.command.contract';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class ReconciliationsController {
  constructor(
    @Inject(PayoutProvidersSymbols.RECONCILE_STRIPE_COMMAND)
    private readonly reconcileStripeCommand: IReconcileStripeCommand,
  ) {}

  @Post('/reconciliations/stripe')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async reconcileStripe(
    @Req() request: FastifyRequest,
    @Body() inputDto: ReconcileStripeInputDto,
  ) {
    await this.reconcileStripeCommand.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
    });
  }
}
