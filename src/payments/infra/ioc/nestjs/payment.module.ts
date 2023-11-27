import { Module } from '@nestjs/common';
import { queriesProviders } from './queries';
import { commandsProviders } from './commands';
import { PaymentGatewayController } from '~/payments/infra/controllers/nestjs';

@Module({
  providers: [...queriesProviders, ...commandsProviders],
  controllers: [PaymentGatewayController],
  exports: [...queriesProviders, ...commandsProviders],
})
export class PaymentModule {}
