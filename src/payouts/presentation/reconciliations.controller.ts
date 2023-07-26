import { Body, Controller, Inject, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IReconciliateStripeCommand } from '~/payouts/application/commands/contracts/reconciliate-stripe.command.contract';
import { IReconciliateBexsCommand } from '~/payouts/application/commands/contracts/reconciliate-bexs.command.contract';
import {
  ReconciliateBexsInputDto,
  ReconciliateStripeInputDto,
} from '~/payouts/presentation/dtos/requests/reconciliations';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class ReconciliationsController {
  constructor(
    @Inject(PayoutProvidersSymbols.RECONCILIATE_STRIPE_COMMAND)
    private readonly reconciliateStripeCommand: IReconciliateStripeCommand,
    @Inject(PayoutProvidersSymbols.RECONCILIATE_BEXS_COMMAND)
    private readonly reconciliateBexsCommand: IReconciliateBexsCommand,
  ) {}

  @Post('/reconciliations/stripe')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async reconciliateStripe(
    @Req() request: FastifyRequest,
    @Body() inputDto: ReconciliateStripeInputDto,
  ) {
    await this.reconciliateStripeCommand.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
    });
  }

  @Post('/reconciliations/bexs')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async reconciliateBexs(
    @Req() request: FastifyRequest,
    @Query() inputDto: ReconciliateBexsInputDto,
  ) {
    const file = await request.file({
      limits: { fileSize: 1024 * 1024 * 5 }, // Limit 5mb
    });

    await this.reconciliateBexsCommand.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      file,
    });
  }
}
