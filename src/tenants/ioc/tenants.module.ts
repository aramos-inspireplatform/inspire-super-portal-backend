import { Module } from '@nestjs/common';
import { CreateTenantUseCaseFactoryProvider } from '~/tenants/ioc/providers/create-tenant-use-case-factory.provider';
import { ListAllTenantsUseCaseFactoryProvider } from '~/tenants/ioc/providers/list-all-tenants-use-case-factory.provider';
import { TenantsController } from '~/tenants/presentation/tenants.controller';
import { FindTenantUseCaseFactoryProvider } from './providers/find-tenant-use-case-factory.provider';
import { FindTenantV2UseCaseFactoryProvider } from './providers/find-tenant-v2-use-case-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { FindAllTenantV2UseCaseFactoryProvider } from '~/tenants/ioc/providers/find-all-tenant-v2-use-case-factory.provider';

@Module({
  providers: [
    FindAllTenantV2UseCaseFactoryProvider.register(),
    FindTenantV2UseCaseFactoryProvider.register(),

    // Deprecated below ----------------------------

    ListAllTenantsUseCaseFactoryProvider.register(),
    FindTenantUseCaseFactoryProvider.register(),
    CreateTenantUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsController],
  imports: [InspireTenantApiServiceModule],
})
export class TenantsModule {}
