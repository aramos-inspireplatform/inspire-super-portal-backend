import { FactoryProvider } from '@nestjs/common';
import { IFindOneUserDao } from '~/users/application/queries/contracts/find-one-user.dao.contract';
import { FindOneUserQuery } from '~/users/application/queries/find-one-user.query';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class FindOneUserQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ONE_USER_QUERY,
      useFactory: (findOneUserDao: IFindOneUserDao) =>
        new FindOneUserQuery(findOneUserDao),
      inject: [UsersProvidersSymbols.FIND_ONE_USER_DAO],
    };
  }
}
