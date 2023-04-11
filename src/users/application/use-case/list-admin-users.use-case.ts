import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { URL } from 'url';

export class ListAdminUsersUseCase {
  private readonly USERS_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;
  constructor(private readonly httpClient: IHttpClient) {}

  async list(attrs: ListUsersUseCase.InputAttrs) {
    const url = new URL(`${this.USERS_ROUTE}`);
    url.searchParams.set('isPaginated', 'true');
    if (attrs.pagination.keywords)
      url.searchParams.set('keywords', attrs.pagination.keywords);

    if (attrs.pagination.sortby)
      url.searchParams.set('sortby', attrs.pagination.sortby);

    url.searchParams.set('page', `${attrs.pagination.page ?? '0'}`);
    url.searchParams.set('pagesize', `${attrs.pagination.pageSize ?? '0'}`);

    const responseOrError =
      await this.httpClient.get<ListUsersUseCase.UsersResponse>(
        url.toString(),
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace ListUsersUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
    accessToken: string;
  };

  export type User = {
    id: string;
    name: string;
    title: string;
    email: string;
    adminBlockedDate: string;
  };

  export type UsersResponse = InspireHttpPaginatedResponse<User>;
}
