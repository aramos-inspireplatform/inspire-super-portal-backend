import { FactoryProvider } from '@nestjs/common';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';
import { FindOneCurrencyDao } from '~/currencies/infra/daos/find-one-currency.dao';
import { CurrencyProvidersSymbols } from '~/currencies/ioc/currencies.symbols';

export class FindOneCurrencyDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: CurrencyProvidersSymbols.FIND_ONE_CURRENCY_DAO,
      useFactory: (dataSource: DataSource) =>
        new FindOneCurrencyDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
