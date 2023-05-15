import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';
import { Module } from '~/requests/domain/entities/module.entity';

export class InspireTenantService implements IInspireTenantService {
  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_MODULE_URL = `${process.env.TENANT_URL}/modules`;
  private readonly TENANT_TENANT_MODULE_URL = `${process.env.TENANT_URL}/tenant-modules`;
  private USERS_TENANT_URL = `${process.env.TENANT_URL}/user`;

  constructor(private readonly httpClient: IHttpClient) {}

  async getTenantJwtTokenUserDetails({
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

  async linkTenantModule({
    attrs,
    moduleType,
    tenant,
  }: {
    moduleType: Module;
    attrs: {
      accessToken: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
    };
  }) {
    const moduleResponse = await this.httpClient.post<InspireHttpResponse>(
      `${this.TENANT_MODULE_URL}`,
      {
        name: moduleType.name,
        slug: moduleType.name.toLowerCase(),
        isActive: true,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: tenant.googleTenantId,
        },
      },
    );

    await this.httpClient.post(
      `${this.TENANT_TENANT_MODULE_URL}`,
      {
        tenantId: tenant.id,
        moduleId: moduleResponse.data.body.data.id,
        name: moduleType.name,
        link: attrs.moduleUrl,
        isActive: true,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: tenant.googleTenantId,
        },
      },
    );
  }

  async getTenantAndUserDetails(attrs: {
    tenantWrapperIntegrationId: string;
    accessToken: string;
  }): Promise<{
    tenant: IInspireTenantService.TenantDetails;
    user: IInspireTenantService.TenantUserUserDetails;
  }> {
    const tenantDetailsResponse = await this.getTenantDetails({
      accessToken: attrs.accessToken,
      wrapperIntegrationId: attrs.tenantWrapperIntegrationId,
    });
    if (tenantDetailsResponse instanceof Error) throw tenantDetailsResponse;
    const userReponse =
      await this.httpClient.get<InspireTenantService.InspireUserResponse>(
        `${this.USERS_TENANT_URL}?isPaginated=true`,
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: tenantDetailsResponse.googleTenantId,
          },
        },
      );

    const tenantUserDetails = userReponse.data.body.data.rows[0];

    return {
      tenant: tenantDetailsResponse,
      user: tenantUserDetails,
    };
  }
}

export namespace InspireTenantService {
  export type UserDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.TenantUserUserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.TenantDetails>;

  export type InspireUserResponse =
    InspireHttpPaginatedResponse<IInspireTenantService.TenantUserUserDetails>;
}
