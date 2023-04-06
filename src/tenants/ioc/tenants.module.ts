import { Module } from '@nestjs/common';
import { CreateTenantUseCaseProviderFactory } from '~/tenants/ioc/providers/create-tenant-use-case-factory.provider';
import { TenantsController } from '~/tenants/presentation/tenants.controller';

@Module({
  providers: [CreateTenantUseCaseProviderFactory.register()],
  controllers: [TenantsController],
})
export class TenantsModule {}
