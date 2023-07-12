import { Module } from '@nestjs/common';
import { PayoutPaymentsController } from '~/payouts/presentation/payout-payments.controller';
import { InspirePaymentApiServiceModule } from '~/shared/application/services/inspire-api-services/payment/ioc/inspire-payment-api-service.module';
import { FindAllPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-payments-query-factory.provider';
import { FindAllPayoutPaymentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-payments-dao-factory.provider';
import { FindAllTenantPayoutsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-payouts-query-factory.provider';
import { FindAllTenantPayoutsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-payouts-dao-factory.provider';
import { PayoutController } from '~/payouts/presentation/payout.controller';
import { PayoutTenantBalancesController } from '~/payouts/presentation/payout-tenant-balances.controller';
import { FindOneTenantBalanceQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-tenant-balance-query-factory.provider';
import { FindOneTenantBalanceDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-balance-dao-factory.provider';

@Module({
  providers: [
    FindAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllPayoutPaymentsDaoFactoryProvider.register(),
    FindAllTenantPayoutsQueryFactoryProvider.register(),
    FindAllTenantPayoutsDaoFactoryProvider.register(),
    FindOneTenantBalanceQueryFactoryProvider.register(),
    FindOneTenantBalanceDaoFactoryProvider.register(),
  ],
  controllers: [
    PayoutPaymentsController,
    PayoutController,
    PayoutTenantBalancesController,
  ],
  imports: [InspirePaymentApiServiceModule],
})
export class PayoutsModule {}
