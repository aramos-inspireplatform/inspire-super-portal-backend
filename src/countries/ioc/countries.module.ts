import { Module } from '@nestjs/common';
import { ListCountriesUseCaseFactoryProvider } from '~/countries/ioc/providers/list-countries-use-case-factory.provider';
import { CountriesController } from '~/countries/presentation/countries.controller';

@Module({
  providers: [ListCountriesUseCaseFactoryProvider.register()],
  controllers: [CountriesController],
})
export class CountriesModule {}
