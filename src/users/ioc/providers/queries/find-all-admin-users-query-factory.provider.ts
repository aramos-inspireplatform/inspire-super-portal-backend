import { FactoryProvider } from '@nestjs/common';
import { IFindAllAdminUsersDao } from '~/users/application/queries/contracts/find-all-admin-users.dao.contract';
import { FindAllAdminUsersQuery } from '~/users/application/queries/find-all-admin-users.query';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class FindAllAdminUsersQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ALL_ADMIN_USERS_QUERY,
      useFactory: (findAllAdminUsersDao: IFindAllAdminUsersDao) =>
        new FindAllAdminUsersQuery(findAllAdminUsersDao),
      inject: [UsersProvidersSymbols.FIND_ALL_ADMIN_USERS_DAO],
    };
  }
}
