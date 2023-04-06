import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class CreateTenantUseCase {
  private readonly CREATE_TENANT_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(private readonly httpClient: IHttpClient) {}

  async create(attrs: CreateTenantUseCase.InputAttrs) {
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
    return tenant;
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
