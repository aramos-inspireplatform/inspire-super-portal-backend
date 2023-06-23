import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { URL } from 'url';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class ListTenantUsersUseCase {
  private readonly USERS_ROUTE = `${process.env.TENANT_URL}/user`;
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
  ) {}

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
            tenant: attrs.googleTenantId,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }

  //   private async getTenantId(attrs: ListUsersUseCase.InputAttrs) {
  //     if (!attrs.integrationCode) return null;
  //     const tenant = await this.tenantRepository.findById({
  //       integrationCode: attrs.integrationCode,
  //     });
  //     if (!tenant) throw new Error('exception:TENANT_NOT_FOUND');
  //     return tenant.tenantId;
  //   }
}

export namespace ListUsersUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
    googleTenantId?: string;
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
