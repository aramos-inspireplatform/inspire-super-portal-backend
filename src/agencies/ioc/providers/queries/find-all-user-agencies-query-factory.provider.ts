import { FactoryProvider } from '@nestjs/common';
import { IFindAllUserAgenciesDao } from '~/agencies/application/daos/find-all-user-agencies.dao.contract';
import { FindAllUserAgenciesQuery } from '~/agencies/application/queries/find-all-user-agencies.query';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';

export class FindAllUserAgenciesQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AgenciesProvidersSymbols.FIND_ALL_USER_AGENCIES_QUERY,
      useFactory: (findAllUserAgenciesDao: IFindAllUserAgenciesDao) =>
        new FindAllUserAgenciesQuery(findAllUserAgenciesDao),
      inject: [AgenciesProvidersSymbols.FIND_ALL_USER_AGENCIES_DAO],
    };
  }
}
