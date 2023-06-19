import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
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
}
