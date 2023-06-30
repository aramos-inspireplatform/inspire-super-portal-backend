import { FactoryProvider } from '@nestjs/common';
import { IFindAllAgenciesDao } from '~/agencies/application/daos/find-all-agencies.dao.contract';
import { FindAllAgenciesQuery } from '~/agencies/application/queries/find-all-agencies.query';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';

export class FindAllAgenciesQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AgenciesProvidersSymbols.FIND_ALL_AGENCIES_QUERY,
      useFactory: (findAllAgenciesDao: IFindAllAgenciesDao) =>
        new FindAllAgenciesQuery(findAllAgenciesDao),
      inject: [AgenciesProvidersSymbols.FIND_ALL_AGENCIES_DAO],
    };
  }
}
