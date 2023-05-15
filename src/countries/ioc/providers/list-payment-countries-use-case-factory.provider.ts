import { FactoryProvider } from '@nestjs/common';
import { ListPaymentCountriesUseCase } from '~/countries/application/use-case/list-payment-countries.use-case';
import { ICountryRepository } from '~/countries/infra/contracts/repositories/country-repository.contract';
import { CountriesProvidersSymbols } from '~/countries/ioc/countries-providers.symbols';
import { CountryRepository } from '~/shared/infra/database/repositories/country.repository';

export class ListPaymentCountriesUseCaseProvider {
  static register(): FactoryProvider {
    return {
      provide: CountriesProvidersSymbols.LIST_PAYMENT_COUNTRIES_USE_CASE,
      useFactory: (countryRepository: ICountryRepository) =>
        new ListPaymentCountriesUseCase(countryRepository),
      inject: [CountryRepository],
    };
  }
}
