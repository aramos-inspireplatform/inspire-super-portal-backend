import { NotFoundException } from '@nestjs/common';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class FindTenantUseCase {
  private readonly TENANTS_ROUTE = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
  ) {}
  async find(attrs: FindTenantUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({ id: attrs.tenantId });
    if (!tenant)
      throw new NotFoundException('ExceptionsConstants.TENANT_NOT_FOUND');

    const url = new URL(`${this.TENANTS_ROUTE}/${tenant.wrapperIntegrationId}`);

    const responseOrError = await this.httpClient.get(url.toString(), {
      headers: {
        authorization: attrs.accessToken,
      },
    });
    if (responseOrError instanceof Error) throw responseOrError;
    return {
      ...responseOrError.data.body.data,
      id: tenant.id,
      tenantStatus: tenant.tenantStatus,
      wrapperIntegrationId: tenant.wrapperIntegrationId,
    };
  }
}
export namespace FindTenantUseCase {
  export type InputAttrs = {
    tenantId: string;
    accessToken: string;
  };

  export type Tenant = {
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

  export type TenantRouteResponse = InspireHttpResponse<Tenant>;
}
