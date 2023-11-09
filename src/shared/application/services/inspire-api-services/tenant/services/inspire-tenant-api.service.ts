import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';
import { Module } from '~/requests/domain/entities/module.entity';
import { InspireTenantApiServiceTenantsDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.tenants.dto';
import { InspireTenantApiServiceAdminUsersDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.admin-users.dto';

export class InspireTenantApiService implements IInspireTenantApiService {
  private readonly TENANT_V2_BASE_URL = `${process.env.TENANT_URL}/v2/tenants`;
  private readonly ADMIN_USERS_BASE_URL = `${process.env.TENANT_URL}/user/admin-users`;

  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_MODULE_URL = `${process.env.TENANT_URL}/modules`;
  private readonly TENANT_TENANT_MODULE_URL = `${process.env.TENANT_URL}/tenant-modules`;
  private readonly TENANT_INTEGRATION_ROUTE = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_INTEGRATION_KEY = `${process.env.TENANT_INTEGRATION_KEY}`;

  constructor(private readonly httpClient: IHttpClient) {}

  // Tenants
  async findAllTenants(
    attrs: InspireTenantApiServiceTenantsDto.FindAllInputAttrs,
  ): InspireTenantApiServiceTenantsDto.FindAllTenantsResult {
    const url = `${this.TENANT_V2_BASE_URL}`;

    const tenants = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
      },
      params: {
        ...attrs.pagination,
      },
    });

    return tenants.data.body.data;
  }

  async findOneTenant(
    attrs: InspireTenantApiServiceTenantsDto.FindOneTenantInputAttrs,
  ): InspireTenantApiServiceTenantsDto.FindOneTenantResult {
    const url = `${this.TENANT_V2_BASE_URL}/${attrs.gTenantId}`;

    const tenant =
      await this.httpClient.get<InspireTenantApiService.FindOneTenantHttpResponse>(
        url,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );

    return tenant.data.body.data;
  }

  async createTenant(
    attrs: InspireTenantApiServiceTenantsDto.CreateTenantInputAttrs,
  ): InspireTenantApiServiceTenantsDto.CreateTenantResult {
    const url = `${this.TENANT_V2_BASE_URL}`;

    const tenant =
      await this.httpClient.post<InspireTenantApiService.CreateTenantHttpResponse>(
        url,
        attrs.tenant,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );

    return tenant.data.body.data;
  }

  // Admin Users
  async findOneAdminUser(
    attrs: InspireTenantApiServiceAdminUsersDto.FindOneInputAttrs,
  ): InspireTenantApiServiceAdminUsersDto.FindOneResult {
    const url = `${this.ADMIN_USERS_BASE_URL}/${attrs.userObjectId}`;

    const adminUser =
      await this.httpClient.get<InspireTenantApiService.FindOneAdminUserHttpResponse>(
        url,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );

    return adminUser.data.body.data;
  }

  // async activate(
  //   attrs: InspireTenantApiServiceDto.ActivateInputAttrs,
  // ): InspireTenantApiServiceDto.ActivateResult {
  //   const url = `${this.V2_BASE_URL}/${attrs.integrationCode}/activate`;

  //   const tenant =
  //     await this.httpClient.patch<InspireTenantApiService.CreateHttpResponse>(
  //       url,
  //       null,
  //       {
  //         headers: {
  //           'x-integration-key': this.TENANT_INTEGRATION_KEY,
  //         },
  //       },
  //     );

  //   return tenant.data.body.data;
  // }

  // Deprecated below ----------------------------
  async getTenantDetails(
    attrs: InspireTenantApiServiceTenantsDto.GetTenantDetailsInputAttrs,
  ): InspireTenantApiServiceTenantsDto.TenantDetailsResult {
    const url = `${this.TENANT_DETAILS_URL}/${attrs.integrationCode}/integration-data`;
    const responseOrError =
      await this.httpClient.get<InspireTenantApiService.TenantDetailsHttpResponse>(
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
  }): Promise<InspireTenantApiServiceTenantsDto.TenantDetails> {
    const response = await this.httpClient.get<
      InspireHttpResponse<InspireTenantApiServiceTenantsDto.TenantDetails>
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
  }: InspireTenantApiServiceTenantsDto.GetTenantUserDetailsInputAttrs): InspireTenantApiServiceTenantsDto.UserDetailsResult {
    const responseOrError =
      await this.httpClient.get<InspireTenantApiService.UserDetailsHttpResponse>(
        this.GET_USER_DETAILS_URL,
        { headers: { authorization: accessToken } },
      );
    return responseOrError.data.body.data;
  }

  async updateTenant(
    attrs: InspireTenantApiServiceTenantsDto.UpdateTenantInputAttrs,
  ): InspireTenantApiServiceTenantsDto.UpdateTenantResult {
    const response = await this.httpClient.patch<any>(
      `${this.TENANT_INTEGRATION_ROUTE}/${attrs.id}`,
      attrs.body,
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.tenant,
        },
      },
    );

    return response.data.body.data;
  }
}
export namespace InspireTenantApiService {
  // Tenants
  export type FindAllTenantsHttpResponse =
    InspireHttpPaginatedResponse<InspireTenantApiServiceTenantsDto.Tenants>;

  export type FindOneTenantHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceTenantsDto.Tenant>;

  export type CreateTenantHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceTenantsDto.Tenant>;

  // Admin users
  export type FindOneAdminUserHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceAdminUsersDto.AdminUser>;

  export type UpdateTenantHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceTenantsDto.Tenant>;

  // Deprecated below -------------------------------------
  export type UserDetailsHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceTenantsDto.TenantUserUserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceTenantsDto.TenantDetails>;

  export type InspireUserResponse =
    InspireHttpPaginatedResponse<InspireTenantApiServiceTenantsDto.TenantUserUserDetails>;
}
