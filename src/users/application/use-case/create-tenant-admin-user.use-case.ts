import { timingSafeEqual } from 'crypto';
import { RandomUUIDGeneratorAdapter } from '~/shared/application/adapters/uuid-generator.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class CreateTenantAdminUserUseCase {
  private readonly CREATE_ADMIN_USER_ROUTE = `${process.env.TENANT_URL}/user`;
  private readonly RESET_PASSWORD_ROUTE = `${process.env.TENANT_URL}/auth/forgot-password`;

  constructor(private readonly httpClient: IHttpClient) {}

  async create(attrs: CreateTenantAdminUserUseCase.InputAttrs) {
    const uuid = RandomUUIDGeneratorAdapter();
    const randomPassword = `AAA_***_${uuid}`;
    const responseOrError =
      await this.httpClient.post<CreateTenantAdminUserUseCase.UserRouteResponse>(
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
    if (responseOrError instanceof Error) throw responseOrError;
    await this.httpClient.post(this.RESET_PASSWORD_ROUTE, {
      email: responseOrError.data.body.data.email,
    });
  }
}

export namespace CreateTenantAdminUserUseCase {
  export type InputAttrs = {
    accessToken: string;
    user: {
      firstName: string;
      lastName: string;
      userTypeId: string;
      email: string;
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
