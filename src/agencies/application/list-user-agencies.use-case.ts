import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListUserAgenciesUseCase {
  private USER_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;

  constructor(private readonly httpClient: IHttpClient) {}

  async handle(attrs: ListUserAgenciesUseCase.InputAttrs) {
    const url = `${this.USER_ROUTE}/${attrs.userId}/agencies`;
    const response =
      await this.httpClient.get<ListUserAgenciesUseCase.InspireAgencyHttpResponse>(
        url,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );

    return response.data.body.data;
  }
}

export namespace ListUserAgenciesUseCase {
  export type InputAttrs = {
    userId: string;
    accessToken: string;
  };

  export type InspireAgency = {
    id: string;
    name: string;
    defaultTenantId: DefaultTenantId;
  };

  export type DefaultTenantId = {
    id: string;
    name: string;
    settings: Settings;
  };

  export type Settings = object;
  export type InspireAgencyHttpResponse = InspireHttpResponse<InspireAgency>;
}
