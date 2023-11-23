import { Module } from '@nestjs/common';
import { queriesProviders } from './queries';
import { commandsProviders } from './commands';
import { PaymentGatewayCalculatorController } from '~/calculator/infra/controllers/nestjs';

@Module({
  providers: [...queriesProviders, ...commandsProviders],
  controllers: [PaymentGatewayCalculatorController],
  exports: [...queriesProviders, ...commandsProviders],
})
export class PaymentGatewayCalculatorModule {}
