import { Module } from '@nestjs/common';
import { ManualReconciledCommandFactoryProvider } from '~/transactions/ioc/providers/commands/manual-reconciled-command-factory.provider';
import { TransactionsController } from '~/transactions/presentation/transactions.controller';

@Module({
  providers: [ManualReconciledCommandFactoryProvider.register()],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
