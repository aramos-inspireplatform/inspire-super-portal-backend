import { FactoryProvider } from '@nestjs/common';
import { IFindOneAdminUserDao } from '~/users/application/daos/find-one-admin-user.dao.contract';
import { FindOneAdminUserQuery } from '~/users/application/queries/find-one-admin-user.query';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class FindOneAdminUserQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ONE_ADMIN_USER_QUERY,
      useFactory: (findOneAdminUserDao: IFindOneAdminUserDao) =>
        new FindOneAdminUserQuery(findOneAdminUserDao),
      inject: [UsersProvidersSymbols.FIND_ONE_ADMIN_USER_DAO],
    };
  }
}
