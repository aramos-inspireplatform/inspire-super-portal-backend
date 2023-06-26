import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
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
}
