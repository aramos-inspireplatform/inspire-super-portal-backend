import { Module } from '@nestjs/common';
import { InspireTenantServiceFactoryProvider } from '~/inspire-tenant/ioc/providers/inspire-tenant-service-factory.provider';

@Module({
  providers: [InspireTenantServiceFactoryProvider.register()],
  exports: [InspireTenantServiceFactoryProvider.register()],
})
export class InspireTenantModule {}
