import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class FindAllTenantV2UseCase {
  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async handle(attrs: FindAllTenantV2UseCase.InputAttrs) {
    const tenants = await this.inspireTenantService.findAll({
      accessToken: attrs.accessToken,
      pagination: attrs.pagination,
    });
    if (tenants instanceof Error) throw tenants;

    // console.log('------------------------------------------------');
    // console.log(tenants);
    // console.log('------------------------------------------------');

    return tenants;
  }
}

export namespace FindAllTenantV2UseCase {
  export type InputAttrs = {
    accessToken: string;
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };

  export type InspireTenant = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    logo: any;
    timezone: Timezone;
    languages: Languages;
    currencies: any[];
    agencies: Agencies;
  };

  type Settings = {
    teste: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Agencies = {
    id: string;
    name: string;
  };

  export type InspireTenantHttpResponse = InspireHttpResponse<InspireTenant>;
}
