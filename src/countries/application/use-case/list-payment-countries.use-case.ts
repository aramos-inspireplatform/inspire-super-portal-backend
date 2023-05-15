import { ICountryRepository } from '~/countries/infra/contracts/repositories/country-repository.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListPaymentCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async list() {
    return this.countryRepository.listAndCount();
  }
}

export namespace ListPaymentCountriesUseCase {
  export type Country = {
    id: string;
    name: string;
    code: string;
    nativeName: string;
    flagSvgUrl: string;
  };

  export type CountryResponse = InspireHttpResponse<Country[]>;
}
