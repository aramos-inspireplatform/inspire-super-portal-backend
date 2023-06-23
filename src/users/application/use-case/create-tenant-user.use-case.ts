import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { TenantNotFoundException } from '~/tenants/domain/exceptions/tenant-not-found.exception';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateTenantUserUseCase {
  private readonly CREATE_TENANT_USER = `${process.env.TENANT_URL}/user`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantsRepository: ITenantRepository,
  ) {}

  async create(attrs: CreateTenantUserUseCase.InputAttrs) {
    const tenant = await this.tenantsRepository.findById({
      integrationCode: attrs.tenantId,
    });
    if (!tenant) throw new TenantNotFoundException();
    const responseOrError =
      await this.httpClient.post<CreateTenantUserUseCase.UserRouteResponse>(
        this.CREATE_TENANT_USER,
        {
          ...attrs.user,
          withAllRoles: true,
        },
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: tenant.tenantId,
            'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace CreateTenantUserUseCase {
  export type InputAttrs = {
    accessToken: string;
    tenantId: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmationPassword: string;
      title?: string;
      phoneNumber?: string;
    };
  };

  export type CreatedUser = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    googleTenantId: string;
    isSsoUser: boolean;
  };

  export type UserRouteResponse = InspireHttpResponse<CreatedUser>;
}
