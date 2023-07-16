import { Controller, Post, Inject, Param, Req, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { TransactionProvidersSymbols } from '~/transactions/ioc/transactions-providers.symbols';
import { ManualReconciledDto } from '~/transactions/presentation/dtos';
import { IManualReconciledCommand } from '~/transactions/application/commands';
import { FastifyRequest } from 'fastify';

@AuthenticatedRoute()
@Controller('transactions')
@ApiTags('Transactions')
@CustomApiExtraModels()
export class TransactionsController {
  constructor(
    @Inject(TransactionProvidersSymbols.MANUAL_RECONCILED_COMMAND)
    private readonly manualReconciledCommand: IManualReconciledCommand,
  ) {}

  @Post(':transactionId/manual-reconciled/:status')
  @ApiOperation({
    description: 'Method to mark if the transaction was reconciled manually.',
  })
  async manualReconciled(
    @Req() request: FastifyRequest,
    @Param() { transactionId, status }: ManualReconciledDto.Params,
    @Body() { gTenantId }: ManualReconciledDto.Body,
  ) {
    return this.manualReconciledCommand.execute({
      accessToken: request.headers.authorization,
      gTenantId,
      transactionId,
      status,
    });
  }
}
