import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class ListAllTenantsUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async list(attrs: ListAllTenantsUseCase.InputAttrs) {
    const [tenants, count] = await this.tenantRepository.listAndCount({
      skip: attrs.pagination.page * attrs.pagination.pageSize,
      take: attrs.pagination.pageSize,
    });

    return {
      rows: tenants,
      count,
      page: attrs.pagination.page ?? 0,
      pageSize: tenants.length,
    };
  }
}

export namespace ListAllTenantsUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
    accessToken: string;
  };

  export type Tenant = {
    id: string;
    name: string;
    integrationCode: string;
    tenantStatus: TenantStatus;
    createdDate: Date;
    updatedDate: Date;
  };

  export type TenantsResponse = InspireHttpPaginatedResponse<Tenant>;
}
