import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';

export class CreateTenantUseCase {
  private readonly CREATE_TENANT_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusesRepository: ITenantStatusesRepository,
  ) {}

  async create(attrs: CreateTenantUseCase.InputAttrs) {
    // TODO: move this to the InspireTenantService (wrapper for all tenant-api calls)
    const responseOrError =
      await this.httpClient.post<CreateTenantUseCase.TenantRouteResponse>(
        this.CREATE_TENANT_URL,
        attrs.tenant,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    const tenant = responseOrError?.data?.body?.data;

    const tenantPendingStatuses = await this.tenantStatusesRepository.findById({
      id: TenantStatusesConstant.Pending,
    });
    const storedTenant = new Tenant({
      slug: attrs.tenant.slug,
      name: attrs.tenant.name,
      integrationCode: tenant.id,
      tenantStatus: tenantPendingStatuses,
      createdByUserId: attrs.currentUser,
      createdByUserEmail: tenant.userEmail,
      tenantId: tenant.googleTenantId,
    });
    await this.tenantRepository.save({ tenant: storedTenant });
    return {
      ...tenant,
      id: storedTenant.id,
      integrationCode: tenant.id,
    };
  }
}

export namespace CreateTenantUseCase {
  type Settings = { [property: string]: Settings };

  type Tenant = {
    name: string;
    accountName: string;
    slug: string;
    countryId: string;
    settings?: Settings;
    agencyId?: string;
    timezoneId?: string;
    languageId?: string;
  };

  export type InputAttrs = {
    tenant: Tenant;
    accessToken: string;
    currentUser: string;
  };

  export type CreatedTenant = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    logo: any;
    accountName: string;
    publicBusinessName: any;
    supportEmail: any;
    supportPhoneNumber: any;
    showPhoneOnInvoiceAndReceipt: boolean;
    statementDescriptor: any;
    shortenedDescriptor: any;
    businessWebsite: any;
    supportWebsite: any;
    privacyPolicy: any;
    termsOfService: any;
    timezone: Timezone;
    languages: Languages;
    currencies: any[];
    countries: Countries;
    userEmail: string;
  };

  export type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  export type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  export type Countries = {
    id: string;
    name: string;
  };

  export type TenantRouteResponse = InspireHttpResponse<CreatedTenant>;
}
