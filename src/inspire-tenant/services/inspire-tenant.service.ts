import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class InspireTenantService implements IInspireTenantService {
  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(private readonly httpClient: IHttpClient) {}

  async getTenantUserDetails({
    accessToken,
  }: IInspireTenantService.GetTenantUserDetailsInputAttrs): IInspireTenantService.UserDetailsResult {
    const responseOrError =
      await this.httpClient.get<InspireTenantService.UserDetailsHttpResponse>(
        this.GET_USER_DETAILS_URL,
        { headers: { authorization: accessToken } },
      );
    return responseOrError.data.body.data;
  }

  async getTenantDetails(
    attrs: IInspireTenantService.GetTenantDetailsInputAttrs,
  ): IInspireTenantService.TenantDetailsResult {
    const url = `${this.TENANT_DETAILS_URL}/${attrs.wrapperIntegrationId}`;
    const responseOrError =
      await this.httpClient.get<InspireTenantService.TenantDetailsHttpResponse>(
        url,
        {
          headers: { authorization: attrs.accessToken },
        },
      );
    return responseOrError.data.body.data;
  }
}

export namespace InspireTenantService {
  export type UserDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.UserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.TenantDetails>;
}
