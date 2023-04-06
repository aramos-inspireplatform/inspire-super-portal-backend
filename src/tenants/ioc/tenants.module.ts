import { Module } from '@nestjs/common';
import { CreateTenantUseCaseFactoryProvider } from '~/tenants/ioc/providers/create-tenant-use-case-factory.provider';
import { ListAlltenantsUseCaseFactoryProvider } from '~/tenants/ioc/providers/list-all-tenants-use-case-factory.provider';
import { TenantsController } from '~/tenants/presentation/tenants.controller';

@Module({
  providers: [
    CreateTenantUseCaseFactoryProvider.register(),
    ListAlltenantsUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsController],
})
export class TenantsModule {}
