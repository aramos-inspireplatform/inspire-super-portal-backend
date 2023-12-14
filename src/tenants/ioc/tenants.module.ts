import { Module } from '@nestjs/common';
import { FindOneTenantQueryFactoryProvider } from './providers/queries/find-one-tenant-query-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { FindAllTenantsQueryFactoryProvider } from '~/tenants/ioc/providers/queries/find-all-tenant-query-factory.provider';
import {
  CreateTenantCommandFactoryProvider,
  UpdateTenantCommandFactoryProvider,
} from '~/tenants/ioc/providers/commands';
import { FindOneTenantDaoFactoryProvider } from '~/tenants/ioc/providers/daos/find-tenant-dao-factory.provider';
import { FindAllTenantsDaoFactoryProvider } from '~/tenants/ioc/providers/daos/find-all-tenants-dao-factory.provider';
import {
  TenantsController,
  TenantsControllerV2,
} from '~/tenants/presentation/';

@Module({
  providers: [
    FindAllTenantsQueryFactoryProvider.register(),
    FindAllTenantsDaoFactoryProvider.register(),
    FindOneTenantQueryFactoryProvider.register(),
    FindOneTenantDaoFactoryProvider.register(),
    CreateTenantCommandFactoryProvider.register(),
    UpdateTenantCommandFactoryProvider.register(),
  ],
  controllers: [TenantsController, TenantsControllerV2],
  imports: [InspireTenantApiServiceModule],
})
export class TenantsModule {}
