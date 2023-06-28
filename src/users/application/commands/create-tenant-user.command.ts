import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repositories/tenant-repository.contract';
import { ICreateTenantUserCommand } from '~/users/application/commands/contracts/create-tenant-user.contract';

export class CreateTenantUserCommand implements ICreateTenantUserCommand {
  private readonly CREATE_TENANT_USER = `${process.env.TENANT_URL}/user`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantsRepository: ITenantRepository,
  ) {}

  async execute(
    attrs: ICreateTenantUserCommand.Input,
  ): ICreateTenantUserCommand.Output {
    const tenantUser =
      await this.httpClient.post<ICreateTenantUserCommand.ApiResponse>(
        this.CREATE_TENANT_USER,
        {
          ...attrs.user,
          withAllRoles: true,
        },
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: attrs.gTenantId,
            'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          },
        },
      );
    if (tenantUser instanceof Error) throw tenantUser;

    return {
      id: tenantUser.data.body.data.id,
      firstName: tenantUser.data.body.data.firstName,
      lastName: tenantUser.data.body.data.lastName,
      title: tenantUser.data.body.data.title,
      email: tenantUser.data.body.data.email,
      phoneNumber: tenantUser.data.body.data.phoneNumber,
      adminBlockedDate: tenantUser.data.body.data.adminBlockedDate,
      gTenantId: tenantUser.data.body.data.googleTenantId,
      isSsoUser: tenantUser.data.body.data.isSsoUser,
    };
  }
}
