import { Module } from '@nestjs/common';
import { CreateTenantUseCaseFactoryProvider } from '~/tenants/ioc/providers/create-tenant-use-case-factory.provider';
import { TenantsController } from '~/tenants/presentation/tenants.controller';

@Module({
  providers: [CreateTenantUseCaseFactoryProvider.register()],
  controllers: [TenantsController],
})
export class TenantsModule {}
