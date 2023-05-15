import { Module } from '@nestjs/common';
import { ListCountriesUseCaseFactoryProvider } from '~/countries/ioc/providers/list-countries-use-case-factory.provider';
import { CountriesController } from '~/countries/presentation/countries.controller';
import { PaymentCountriesController } from '../presentation/payment-countries.controller';
import { ListPaymentCountriesUseCaseProvider } from './providers/list-payment-countries-use-case-factory.provider';

@Module({
  providers: [
    ListCountriesUseCaseFactoryProvider.register(),
    ListPaymentCountriesUseCaseProvider.register(),
  ],
  controllers: [CountriesController, PaymentCountriesController],
})
export class CountriesModule {}
