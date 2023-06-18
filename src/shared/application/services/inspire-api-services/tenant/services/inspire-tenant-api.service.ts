import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';
import { Module } from '~/requests/domain/entities/module.entity';
import { TenantListResponseDto } from '~/tenants/presentation/dto/output/tenant-list-response.dto';
import { TenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';

export class InspireTenantApiService implements IInspireTenantApiService {
  private readonly BASE_URL = `${process.env.TENANT_URL}/tenants`;

  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_MODULE_URL = `${process.env.TENANT_URL}/modules`;
  private readonly TENANT_TENANT_MODULE_URL = `${process.env.TENANT_URL}/tenant-modules`;
  private readonly TENANT_INTEGRATION_ROUTE = `${process.env.TENANT_URL}/tenants`;
  private readonly TENANT_INTEGRATION_KEY = `${process.env.TENANT_INTEGRATION_KEY}`;

  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(
    attrs: IInspireTenantApiService.FindAllInputAttrs,
  ): IInspireTenantApiService.FindAllResult {
    const url = `${this.BASE_URL}/v2`;

    const tenants = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
      },
    });

    return tenants.data.body.data;
  }

  async findOne(
    attrs: IInspireTenantApiService.FindOneInputAttrs,
  ): IInspireTenantApiService.FindOneResult {
    const url = `${this.BASE_URL}/${attrs.integrationCode}`;

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

  // Deprecated below ----------------------------

  async getTenantDetails(
    attrs: IInspireTenantApiService.GetTenantDetailsInputAttrs,
  ): IInspireTenantApiService.TenantDetailsResult {
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
  }): Promise<IInspireTenantApiService.TenantDetails> {
    const response = await this.httpClient.get<
      InspireHttpResponse<IInspireTenantApiService.TenantDetails>
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
  }: IInspireTenantApiService.GetTenantUserDetailsInputAttrs): IInspireTenantApiService.UserDetailsResult {
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
    InspireHttpPaginatedResponse<TenantResponseDto>;

  export type FindOneHttpResponse =
    InspireHttpResponse<IInspireTenantApiService.TenantDetails>;

  export type UserDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantApiService.TenantUserUserDetails>;

  export type TenantDetailsHttpResponse =
    InspireHttpResponse<IInspireTenantApiService.TenantDetails>;

  export type InspireUserResponse =
    InspireHttpPaginatedResponse<IInspireTenantApiService.TenantUserUserDetails>;
}
