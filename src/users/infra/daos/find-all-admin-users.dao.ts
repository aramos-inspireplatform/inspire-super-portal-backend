import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IFindAllAdminUsersDao } from '~/users/application/daos/find-all-admin-users.dao.contract';

export class FindAllAdminUsersDao implements IFindAllAdminUsersDao {
  private readonly USERS_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;

  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    attrs: IFindAllAdminUsersDao.Input,
  ): IFindAllAdminUsersDao.Output {
    const url = new URL(`${this.USERS_ROUTE}`);

    url.searchParams.set('isPaginated', 'true');
    if (attrs.pagination.keywords)
      url.searchParams.set('keywords', attrs.pagination.keywords);

    if (attrs.pagination.sortby)
      url.searchParams.set('sortby', attrs.pagination.sortby);

    url.searchParams.set('page', `${attrs.pagination.page ?? '0'}`);
    url.searchParams.set('pagesize', `${attrs.pagination.pageSize ?? '0'}`);

    const response =
      await this.httpClient.get<IFindAllAdminUsersDao.ApiResponse>(
        url.toString(),
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (response instanceof Error) throw response;

    return {
      rows: response.data.body.data.rows.map((user) => ({
        id: user.id,
        firstName: user.firstName?.trim(),
        lastName: user.lastName?.trim(),
        title: user.title,
        email: user.email,
        status: user?.adminBlockedDate ? 'Inactive' : 'Active',
        phoneNumber: user.phoneNumber,
        phoneNumberCountryId: user.phoneNumberCountryId,
        agencyCount: user.agencyCount,
        userType: user.userType,
        createdAt: user.createdAt,
        adminBlockedDate: user.adminBlockedDate,
      })),
      page: response.data.body.data.page,
      pageSize: response.data.body.data.pageSize,
      count: response.data.body.data.count,
      pageCount: response.data.body.data.pageCount,
      pageNumberIsGood: response.data.body.data.pageNumberIsGood,
      hasPreviousPage: response.data.body.data.hasPreviousPage,
      hasNextPage: response.data.body.data.hasNextPage,
      isFirstPage: response.data.body.data.isFirstPage,
      isLastPage: response.data.body.data.isLastPage,
      numberOfFirstItemOnPage: response.data.body.data.numberOfFirstItemOnPage,
      firstItemOnPage: response.data.body.data.firstItemOnPage,
      numberOfLastItemOnPage: response.data.body.data.numberOfLastItemOnPage,
      lastItemOnPage: response.data.body.data.lastItemOnPage,
    };
  }
}
