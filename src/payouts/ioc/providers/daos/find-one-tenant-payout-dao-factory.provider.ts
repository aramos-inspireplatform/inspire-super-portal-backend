import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOneTenantPayoutDao } from '~/payouts/infra/daos/find-one-tenant-payout.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class FindOneTenantPayoutDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_DAO,
      useFactory: (
        inspirePaymentApiService: IInspirePaymentApiService,
        dataSource: DataSource,
      ) => new FindOneTenantPayoutDao(inspirePaymentApiService, dataSource),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE,
        DatabaseProvidersSymbols.DATA_SOURCE,
      ],
    };
  }
}
