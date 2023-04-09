import { URL } from 'url';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';

export class ListAllTenantsUseCase {
  private readonly TENANTS_ROUTE = `${process.env.TENANT_URL}/tenants`;

  constructor(private readonly httpClient: IHttpClient) {}

  async list(attrs: ListAllTenantsUseCase.InputAttrs) {
    const url = new URL(`${this.TENANTS_ROUTE}`);
    if (attrs.pagination.keywords)
      url.searchParams.set('keywords', attrs.pagination.keywords);

    if (attrs.pagination.sortby)
      url.searchParams.set('sortby', attrs.pagination.sortby);

    url.searchParams.set('page', `${attrs.pagination.page ?? '0'}`);
    url.searchParams.set('pagesize', `${attrs.pagination.pageSize ?? '0'}`);

    const responseOrError =
      await this.httpClient.get<ListAllTenantsUseCase.TenantsResponse>(
        url.toString(),
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace ListAllTenantsUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
    accessToken: string;
  };

  export type Tenant = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    logo: string;
    timezone: TimeZone;
    languages: Language;
    currencies: any[];
    agencies: Agency;
  };

  export type Settings = {
    teste: string;
  };

  export type TimeZone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  export type Language = {
    id: string;
    name: string;
    isoCode: string;
  };

  export type Agency = {
    id: string;
    name: string;
  };

  export type TenantsResponse = InspireHttpPaginatedResponse<Tenant>;
}
