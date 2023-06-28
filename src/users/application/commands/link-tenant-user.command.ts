import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repositories/tenant-repository.contract';
import { ILinkTenantUserCommand } from '~/users/application/commands/contracts/link-tenant-user.contract';

export class LinkTenantUserCommand implements ILinkTenantUserCommand {
  private readonly LINK_TENANT_USER_ROUTE = `${process.env.TENANT_URL}/user`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(
    attrs: ILinkTenantUserCommand.Input,
  ): ILinkTenantUserCommand.Output {
    const url = `${this.LINK_TENANT_USER_ROUTE}/${attrs.userId}/link-tenant`;

    const tenantUser =
      await this.httpClient.post<ILinkTenantUserCommand.ApiResponse>(
        url,
        null,
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: attrs.gTenantId,
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
