import { Module } from '@nestjs/common';
import { InspireTenantApiServiceFactoryProvider } from '~/shared/application/services/inspire-api-services/tenant/ioc/providers/inspire-tenant-api-service-factory.provider';

@Module({
  providers: [InspireTenantApiServiceFactoryProvider.register()],
  exports: [InspireTenantApiServiceFactoryProvider.register()],
})
export class InspireTenantApiServiceModule {}
