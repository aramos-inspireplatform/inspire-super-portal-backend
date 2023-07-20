import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { ReconcileStripeInputDto } from '~/payouts/presentation/dtos/requests/reconcile-stripe.input.dto';
import { IReconcileStripeCommand } from '~/payouts/application/commands/contracts/reconcile-stripe.command.contract';
import { IReconcileBexsCommand } from '~/payouts/application/commands/contracts/reconcile-bexs.command.contract';
import { ReconcileBexsInputDto } from '~/payouts/presentation/dtos/requests/reconcile-bexs.input.dto';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class ReconciliationsController {
  constructor(
    @Inject(PayoutProvidersSymbols.RECONCILE_STRIPE_COMMAND)
    private readonly reconcileStripeCommand: IReconcileStripeCommand,
    @Inject(PayoutProvidersSymbols.RECONCILE_BEXS_COMMAND)
    private readonly reconcileBexsCommand: IReconcileBexsCommand,
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

  @Post('/reconciliations/bexs')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async reconcileBexs(
    @Req() request: FastifyRequest,
    @Query() inputDto: ReconcileBexsInputDto,
  ) {
    const file = await request.file({
      limits: { fileSize: 1024 * 1024 * 5 }, // Limit 5mb
    });

    await this.reconcileBexsCommand.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      file,
    });
  }
}
