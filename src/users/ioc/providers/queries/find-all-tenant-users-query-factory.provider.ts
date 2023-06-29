import { FactoryProvider } from '@nestjs/common';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { FindAllTenantUsersQuery } from '../../../application/queries/find-all-tenant-users.query';
import { IFindAllTenantUsersDao } from '~/users/application/daos/find-all-tenant-users.dao.contract';

export class FindAllTenantUsersQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ALL_TENANT_USERS_QUERY,
      useFactory: (findAllTenantUsersDao: IFindAllTenantUsersDao) =>
        new FindAllTenantUsersQuery(findAllTenantUsersDao),
      inject: [UsersProvidersSymbols.FIND_ALL_TENANT_USERS_DAO],
    };
  }
}
