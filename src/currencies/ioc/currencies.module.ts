import { Module } from '@nestjs/common';
import { FindOneCurrencyDaoFactoryProvider } from '~/currencies/ioc/providers/daos/find-one-currency-dao-factory.provider';

@Module({
  providers: [FindOneCurrencyDaoFactoryProvider.register()],
  controllers: [],
  imports: [],
})
export class CurrenciesModule {}
