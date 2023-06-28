import { RandomUUIDGeneratorAdapter } from '~/shared/application/adapters/uuid-generator.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ICreateAdminUserCommand } from '~/users/application/commands/contracts/create-admin-user.contract';

export class CreateAdminUserCommand implements ICreateAdminUserCommand {
  private readonly CREATE_ADMIN_USER_ROUTE = `${process.env.TENANT_URL}/user`;
  private readonly RESET_PASSWORD_ROUTE = `${process.env.TENANT_URL}/auth/forgot-password`;

  constructor(private readonly httpClient: IHttpClient) {}

  async execute(
    attrs: ICreateAdminUserCommand.Input,
  ): ICreateAdminUserCommand.Output {
    const uuid = RandomUUIDGeneratorAdapter();
    const randomPassword = `AAA_***_${uuid}`;

    const response =
      await this.httpClient.post<ICreateAdminUserCommand.ApiResponse>(
        this.CREATE_ADMIN_USER_ROUTE,
        {
          ...attrs.user,
          password: randomPassword,
          confirmationPassword: randomPassword,
        },
        {
          headers: {
            authorization: attrs.accessToken,
            'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          },
        },
      );
    if (response instanceof Error) throw response;

    await this.httpClient.post(this.RESET_PASSWORD_ROUTE, {
      email: response.data.body.data.email,
    });

    return {
      id: response.data.body.data.id,
      firstName: response.data.body.data.firstName,
      lastName: response.data.body.data.lastName,
      title: response.data.body.data.title,
      email: response.data.body.data.email,
      phoneNumber: response.data.body.data.phoneNumber,
      adminBlockedDate: response.data.body.data.adminBlockedDate,
      gTenantId: response.data.body.data.googleTenantId,
      isSsoUser: response.data.body.data.isSsoUser,
    };
  }
}
