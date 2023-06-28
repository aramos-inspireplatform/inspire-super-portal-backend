import { FactoryProvider } from '@nestjs/common';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { FindAllTenantsQuery } from '~/tenants/application/queries/find-all-tenants.query';
import { IFindAllTenantsDao } from '~/tenants/application/queries/contracts/find-all-tenants.dao.contract';

export class FindAllTenantsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_ALL_TENANTS_QUERY,
      useFactory: (findAllTenantsDao: IFindAllTenantsDao) =>
        new FindAllTenantsQuery(findAllTenantsDao),
      inject: [TenantProvidersSymbols.FIND_ALL_TENANTS_DAO],
    };
  }
}
