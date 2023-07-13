import { Global, Module } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { InspireTenantApiServiceFactoryProvider } from '~/shared/application/services/inspire-api-services/tenant/ioc/providers/inspire-tenant-api-service-factory.provider';

@Global()
@Module({
  providers: [InspireTenantApiServiceFactoryProvider.register()],
  exports: [InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE],
})
export class InspireTenantApiServiceModule {}
