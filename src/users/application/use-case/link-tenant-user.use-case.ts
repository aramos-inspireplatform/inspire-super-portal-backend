import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class LinkTenantUserUseCase {
  private readonly LINK_TENANT_USER_ROUTE = `${process.env.TENANT_URL}/user`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async link(attrs: LinkTenantUserUseCase.InputAttrs) {
    const url = `${this.LINK_TENANT_USER_ROUTE}/${attrs.userId}/link-tenant`;
    const responseOrError =
      await this.httpClient.post<LinkTenantUserUseCase.LinkUserRouteResponse>(
        url,
        null,
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: await this.getTenantId(attrs),
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }

  private async getTenantId(attrs: LinkTenantUserUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({
      id: attrs.tenantId,
    });
    if (!tenant) throw new Error('exception:TENANT_NOT_FOUND');
    return tenant.tenantId;
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
