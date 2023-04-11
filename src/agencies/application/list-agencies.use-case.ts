import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';

export class ListAgenciesUseCase {
  private readonly AGENCIES_ROUTE = `${process.env.TENANT_URL}/agencies`;

  constructor(private readonly httpClient: IHttpClient) {}

  async execute(attrs: ListAgenciesUseCase.InputAttrs) {
    const url = this.buildUrl(attrs);
    const resposneOrError =
      await this.httpClient.get<ListAgenciesUseCase.InspireHttpResponse>(url, {
        headers: { authorization: attrs.accessToken },
      });
    if (resposneOrError instanceof Error) throw resposneOrError;
    return resposneOrError.data.body.data;
  }

  protected buildUrl(attrs: ListAgenciesUseCase.InputAttrs) {
    const url = new URL(this.AGENCIES_ROUTE);
    url.searchParams.set('page', `${attrs.searchParams.page ?? 0}`);
    url.searchParams.set('pagesize', `${attrs.searchParams.pageSize ?? 10}`);
    if (attrs.searchParams.keywords)
      url.searchParams.set('keywords', attrs.searchParams.keywords);
    if (attrs.searchParams.sortBy)
      url.searchParams.set('sortby', attrs.searchParams.sortBy);
    return url.toString();
  }
}

export namespace ListAgenciesUseCase {
  export type InputAttrs = {
    accessToken: string;
    searchParams?: {
      page?: number;
      pageSize?: number;
      sortBy?: string;
      keywords?: string;
    };
  };

  export type Agency = {
    id: string;
    name: string;
    logo: any;
    defaultTenantId: DefaultTenantId;
  };

  export type DefaultTenantId = {
    id: string;
    name: string;
    settings: Settings;
  };

  export type Settings = {
    teste: string;
  };

  export type InspireHttpResponse = InspireHttpPaginatedResponse<Agency>;
}
