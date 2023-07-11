import { Module } from '@nestjs/common';
import { PayoutPaymentsController } from '~/payouts/presentation/payout-payments.controller';
import { InspirePaymentApiServiceModule } from '~/shared/application/services/inspire-api-services/payment/ioc/inspire-payment-api-service.module';
import { FindAllPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-payments-query-factory.provider';
import { FindAllPayoutPaymentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-payments-dao-factory.provider';

@Module({
  providers: [
    FindAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllPayoutPaymentsDaoFactoryProvider.register(),
  ],
  controllers: [PayoutPaymentsController],
  imports: [InspirePaymentApiServiceModule],
})
export class PayoutsModule {}
