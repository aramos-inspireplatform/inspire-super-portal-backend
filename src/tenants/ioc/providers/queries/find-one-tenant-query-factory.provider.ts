import { FactoryProvider } from '@nestjs/common';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { FindOneTenantQuery } from '~/tenants/application/queries/find-one-tenant.query';
import { IFindTenantDao as IFindOneTenantDao } from '~/tenants/application/daos/find-one-tenant.dao.contract';

export class FindOneTenantQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_ONE_TENANT_QUERY,
      useFactory: (findOneTenantDao: IFindOneTenantDao) =>
        new FindOneTenantQuery(findOneTenantDao),
      inject: [TenantProvidersSymbols.FIND_ONE_TENANT_DAO],
    };
  }
}
