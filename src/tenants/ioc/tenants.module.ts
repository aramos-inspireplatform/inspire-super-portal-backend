import { Module } from '@nestjs/common';
import { FindTenantQueryFactoryProvider } from './providers/queries/find-tenant-query-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { FindAllTenantsQueryFactoryProvider } from '~/tenants/ioc/providers/queries/find-all-tenant-query-factory.provider';
import { TenantsController } from '~/tenants/presentation/tenants.controller';
import { CreateTenantCommandFactoryProvider } from '~/tenants/ioc/providers/commands/create-tenant-command-factory.provider';
import { FindTenantDaoFactoryProvider } from '~/tenants/ioc/providers/dao/find-tenant-dao-factory.provider';
import { FindAllTenantsDaoFactoryProvider } from '~/tenants/ioc/providers/dao/find-all-tenants-dao-factory.provider';

@Module({
  providers: [
    FindAllTenantsQueryFactoryProvider.register(),
    FindAllTenantsDaoFactoryProvider.register(),
    FindTenantQueryFactoryProvider.register(),
    FindTenantDaoFactoryProvider.register(),
    CreateTenantCommandFactoryProvider.register(),
  ],
  controllers: [TenantsController],
  imports: [InspireTenantApiServiceModule],
})
export class TenantsModule {}
