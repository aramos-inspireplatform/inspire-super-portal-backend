import {
  Get,
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
import {
  IReconciliateBexsCommand,
  IReconciliateStripeCommand,
} from '~/payouts/application/commands/contracts';
import { ReconcilePeriodInputDto } from '~/payouts/presentation/dtos/requests/reconcile-period.input.dto';
import { IFindAllReconcilePeriodQuery } from '~/payouts/application/queries/contracts/find-all-reconcile-period.query.contract';
import {
  ReconciliateBexsInputDto,
  ReconciliateStripeInputDto,
} from '~/payouts/presentation/dtos/requests/reconciliations';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class ReconciliationsController {
  constructor(
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_RECONCILE_PERIOD)
    private readonly findAllReconcilePeriodQuery: IFindAllReconcilePeriodQuery,
    @Inject(PayoutProvidersSymbols.Commands.RECONCILIATE_STRIPE)
    private readonly reconciliateStripeCommand: IReconciliateStripeCommand,
    @Inject(PayoutProvidersSymbols.Commands.RECONCILIATE_BEXS)
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

  @Get('/reconciliations/period')
  @AuthenticatedRoute()
  @ApiOkResponse()
  async reconcilePeriod(
    @Req() request: FastifyRequest,
    @Query() inputDto: ReconcilePeriodInputDto,
  ) {
    return await this.findAllReconcilePeriodQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId: inputDto.gTenantId,
      periodStartDate: inputDto.periodStartDate,
      periodEndDate: inputDto.periodEndDate,
      status: inputDto.status,
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
