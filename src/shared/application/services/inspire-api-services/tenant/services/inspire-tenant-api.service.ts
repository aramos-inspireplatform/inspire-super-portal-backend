import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';
import { Module } from '~/requests/domain/entities/module.entity';
import { InspireTenantApiServiceDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.dto';

export class InspireTenantApiService implements IInspireTenantApiService {
  private readonly V2_BASE_URL = `${process.env.TENANT_URL}/v2/tenants`;

  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_MODULE_URL = `${process.env.TENANT_URL}/modules`;
  private readonly TENANT_TENANT_MODULE_URL = `${process.env.TENANT_URL}/tenant-modules`;
  private readonly TENANT_INTEGRATION_ROUTE = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_INTEGRATION_KEY = `${process.env.TENANT_INTEGRATION_KEY}`;

  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(
    attrs: InspireTenantApiServiceDto.FindAllInputAttrs,
  ): InspireTenantApiServiceDto.FindAllResult {
    const url = `${this.V2_BASE_URL}`;

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

  async findOne(
    attrs: InspireTenantApiServiceDto.FindOneInputAttrs,
  ): InspireTenantApiServiceDto.FindOneResult {
    const url = `${this.V2_BASE_URL}/${attrs.integrationCode}`;

    const tenant =
      await this.httpClient.get<InspireTenantApiService.FindOneHttpResponse>(
        url,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );

    return tenant.data.body.data;
  }

  async create(
    attrs: InspireTenantApiServiceDto.CreateInputAttrs,
  ): InspireTenantApiServiceDto.CreateResult {
    const url = `${this.V2_BASE_URL}`;

    const tenant =
      await this.httpClient.post<InspireTenantApiService.CreateHttpResponse>(
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
    attrs: InspireTenantApiServiceDto.GetTenantDetailsInputAttrs,
  ): InspireTenantApiServiceDto.TenantDetailsResult {
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
  }): Promise<InspireTenantApiServiceDto.TenantDetails> {
    const response = await this.httpClient.get<
      InspireHttpResponse<InspireTenantApiServiceDto.TenantDetails>
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
  }: InspireTenantApiServiceDto.GetTenantUserDetailsInputAttrs): InspireTenantApiServiceDto.UserDetailsResult {
    const responseOrError =
      await this.httpClient.get<InspireTenantApiService.UserDetailsHttpResponse>(
        this.GET_USER_DETAILS_URL,
        { headers: { authorization: accessToken } },
      );
    return responseOrError.data.body.data;
  }
}

export namespace InspireTenantApiService {
  export type FindAllHttpResponse =
    InspireHttpPaginatedResponse<InspireTenantApiServiceDto.Tenants>;

  export type FindOneHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceDto.Tenant>;

  export type CreateHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceDto.Tenant>;

  // Deprecated below -------------------------------------
  export type UserDetailsHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceDto.TenantUserUserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<InspireTenantApiServiceDto.TenantDetails>;

  export type InspireUserResponse =
    InspireHttpPaginatedResponse<InspireTenantApiServiceDto.TenantUserUserDetails>;
}
