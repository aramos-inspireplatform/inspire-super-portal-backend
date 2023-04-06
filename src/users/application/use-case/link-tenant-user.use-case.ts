import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class LinkTenantUserUseCase {
  private readonly LINK_TENANT_USER_ROUTE = `${process.env.TENANT_URL}/user`;

  constructor(private readonly httpClient: IHttpClient) {}

  async link(attrs: LinkTenantUserUseCase.InputAttrs) {
    const url = `${this.LINK_TENANT_USER_ROUTE}/${attrs.userId}/link-tenant`;
    const responseOrError =
      await this.httpClient.post<LinkTenantUserUseCase.LinkUserRouteResponse>(
        url,
        null,
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: attrs.tenantId,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace LinkTenantUserUseCase {
  export type InputAttrs = {
    userId: string;
    tenantId: string;
    accessToken: string;
  };

  export type LinkedUser = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    googleTenantId: string;
    isSsoUser: boolean;
  };

  export type LinkUserRouteResponse = InspireHttpResponse<LinkedUser>;
}
