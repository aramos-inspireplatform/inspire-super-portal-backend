import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class FindTenantV2UseCase {
  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async handle(attrs: FindTenantV2UseCase.InputAttrs) {
    const tenant = await this.inspireTenantService.findOne({
      accessToken: attrs.accessToken,
      integrationCode: attrs.integrationCode,
    });
    if (tenant instanceof Error) throw tenant;

    return tenant;
  }
}

export namespace FindTenantV2UseCase {
  export type InputAttrs = {
    accessToken: string;
    integrationCode: string;
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
