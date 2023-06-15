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
  private readonly TENANT_INTEGRATION_ROUTE = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_INTEGRATION_KEY = `${process.env.TENANT_INTEGRATION_KEY}`;

  constructor(private readonly httpClient: IHttpClient) {}

  async getTenantDetails(
    attrs: IInspireTenantService.GetTenantDetailsInputAttrs,
  ): IInspireTenantService.TenantDetailsResult {
    const url = `${this.TENANT_DETAILS_URL}/${attrs.integrationCode}/integration-data`;
    const responseOrError =
      await this.httpClient.get<InspireTenantService.TenantDetailsHttpResponse>(
        url,
        {
          headers: {
            'x-integration-key': this.TENANT_INTEGRATION_KEY,
          },
        },
      );
    return responseOrError.data.body.data;
  }

  async linkTenantModule({
    attrs,
    module,
    tenant,
  }: {
    module: Module;
    attrs: {
      tenantIntegrationKey: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
      name: string;
      slug: string;
    };
  }) {
    await this.httpClient.post(
      `${this.TENANT_TENANT_MODULE_URL}/integration`,
      {
        tenantId: tenant.id,
        moduleSlug: module.integrationCode,
        name: tenant.name + ' - ' + module.name,
        link: attrs.moduleUrl,
        isActive: true,
      },
      {
        headers: {
          'x-integration-key': attrs.tenantIntegrationKey,
          tenant: tenant.googleTenantId,
        },
      },
    );
  }

  async getTenantAndUserDetails(attrs: {
    googleTenantId: string;
    tenantIntegrationKey: string;
  }): Promise<IInspireTenantService.TenantDetails> {
    const response = await this.httpClient.get<
      InspireHttpResponse<IInspireTenantService.TenantDetails>
    >(
      `${this.TENANT_INTEGRATION_ROUTE}/${attrs.googleTenantId}/integration-data`,
      {
        headers: {
          'x-integration-key': this.TENANT_INTEGRATION_KEY,
        },
      },
    );

    return response.data.body.data;
  }

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
}

export namespace InspireTenantService {
  export type UserDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.TenantUserUserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantService.TenantDetails>;

  export type InspireUserResponse =
    InspireHttpPaginatedResponse<IInspireTenantService.TenantUserUserDetails>;
}
