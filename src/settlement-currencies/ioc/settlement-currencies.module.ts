import { Module } from '@nestjs/common';
import { SettlementCurrenciesController } from '~/settlement-currencies/presentation/settlement-currencies.controller';

@Module({
  controllers: [SettlementCurrenciesController],
})
export class SettlementCurrenciesModule {}
