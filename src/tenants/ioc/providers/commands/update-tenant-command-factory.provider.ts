import { FactoryProvider } from '@nestjs/common';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { UpdateTenantCommand } from '~/tenants/application/commands';
import { RecurringIntervalsRepository } from '~/tenants/infra/repositories/recurring-intervals.repository';
import { TenantStatusesRepository } from '~/tenants/infra/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/tenants/infra/repositories/tenants.repository';
import { TenantProviders } from '~/tenants/ioc/tenants-providers.symbols';

export class UpdateTenantCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProviders.Commands.UPDATE_TENANT,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        inspireBillingService: IInspirePaymentApiService,
      ) => new UpdateTenantCommand(inspireTenantService, inspireBillingService),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE,
      ],
    };
  }
}
