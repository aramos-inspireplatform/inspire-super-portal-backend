import { Module } from '@nestjs/common';
import { FindAllAgenciesDaoFactoryProvider } from '~/agencies/ioc/providers/daos/find-all-agencies-dao-factory.provider';
import { FindAllUserAgenciesDaoFactoryProvider } from '~/agencies/ioc/providers/daos/find-all-user-agencies-dao-factory.provider';
import { FindAllAgenciesQueryFactoryProvider } from '~/agencies/ioc/providers/queries/find-all-agencies-query-factory.provider';
import { FindAllUserAgenciesQueryFactoryProvider } from '~/agencies/ioc/providers/queries/find-all-user-agencies-query-factory.provider';
import { AgenciesController } from '~/agencies/presentation/agencies.controller';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';

@Module({
  providers: [
    FindAllAgenciesQueryFactoryProvider.register(),
    FindAllAgenciesDaoFactoryProvider.register(),
    FindAllUserAgenciesQueryFactoryProvider.register(),
    FindAllUserAgenciesDaoFactoryProvider.register(),
  ],
  controllers: [AgenciesController],
  imports: [InspireTenantApiServiceModule],
})
export class AgenciesModule {}
