import { FactoryProvider } from '@nestjs/common';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { FindTenantQuery } from '~/tenants/application/queries/find-tenant.query';
import { IFindTenantDao } from '~/tenants/application/queries/contracts/find-tenant.dao.contract';

export class FindTenantQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_TENANT_QUERY,
      useFactory: (findTenantDao: IFindTenantDao) =>
        new FindTenantQuery(findTenantDao),
      inject: [TenantProvidersSymbols.FIND_TENANT_DAO],
    };
  }
}
