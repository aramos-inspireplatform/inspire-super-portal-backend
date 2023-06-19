import { NotFoundException } from '@nestjs/common';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
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

    const url = new URL(`${this.TENANTS_ROUTE}/${tenant.integrationCode}`);

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
      integrationCode: tenant.integrationCode,
    };
  }
}
export namespace FindTenantUseCase {
  export type InputAttrs = {
    tenantId: string;
    accessToken: string;
  };
}
