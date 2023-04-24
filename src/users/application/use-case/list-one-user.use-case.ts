import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListOneUserUseCase {
  private readonly USERS_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;

  constructor(private readonly httpClient: IHttpClient) {}

  async execute(attrs: ListOneUserUseCase.ListUserAttrs) {
    const url = `${this.USERS_ROUTE}/${attrs.userId}`;
    const response =
      await this.httpClient.get<ListOneUserUseCase.UsersResponse>(url, {
        headers: { authorization: attrs.accessToken },
      });

    return response?.data?.body?.data;
  }
}

export namespace ListOneUserUseCase {
  export type ListUserAttrs = {
    userId: string;
    accessToken: string;
  };

  export type User = {
    id: string;
    name: string;
    title: string;
    email: string;
    adminBlockedDate: string;
  };

  export type UsersResponse = InspireHttpResponse<User>;
}
