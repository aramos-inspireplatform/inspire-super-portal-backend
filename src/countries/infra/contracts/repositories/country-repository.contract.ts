import { Country } from '~/countries/domain/entities/country.entity';

export interface ICountryRepository {
  listAndCount(): ICountryRepository.ListAllResult;
}

export namespace ICountryRepository {
  export type ListAllResult = Promise<[Country[], number]>;
}
