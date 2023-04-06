import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListCountriesUseCase {
  private readonly COUNTRIES_URL = `${process.env.TENANT_URL}/countries`;

  constructor(private httpClient: IHttpClient) {}

  async list(attrs: ListCountriesUseCase.InputAttrs) {
    const url = `${this.COUNTRIES_URL}?pagesize=1000&page=0`;
    const responseOrError =
      await this.httpClient.get<ListCountriesUseCase.CountriesResponse>(url, {
        headers: {
          authorization: attrs.accessToken,
        },
      });
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data;
  }
}

export namespace ListCountriesUseCase {
  export type InputAttrs = {
    accessToken: string;
  };

  export type Country = {
    id: string;
    name: string;
    nativeName: string;
    code: string;
    flagSvgUrl: string;
    dialCode: string;
    isActive: boolean;
  };

  export type CountriesResponse = InspireHttpResponse<Country[]>;
}
