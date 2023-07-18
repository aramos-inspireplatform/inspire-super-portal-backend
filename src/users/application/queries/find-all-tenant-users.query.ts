import { IFindAllTenantUsersQuery } from '~/users/application/queries/contracts/find-all-tenant-users.query.contract';
import { IFindAllTenantUsersDao } from '~/users/application/daos/find-all-tenant-users.dao.contract';

export class FindAllTenantUsersQuery implements IFindAllTenantUsersQuery {
  constructor(private readonly findAllTenantUsersDao: IFindAllTenantUsersDao) {}

  async execute(
    attrs: IFindAllTenantUsersQuery.Input,
  ): IFindAllTenantUsersQuery.Output {
    const users = await this.findAllTenantUsersDao.execute({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      pagination: {
        page: attrs.pagination.page,
        pageSize: attrs.pagination.pageSize,
        sortby: attrs.pagination.sortby,
        keywords: attrs.pagination.keywords,
      },
    });

    return {
      rows: users.rows.map((user) => ({
        id: user.id,
        name:
          user.firstName?.trim() +
          (user.lastName ? ' ' + user.lastName?.trim() : ''),
        firstName: user.firstName?.trim(),
        lastName: user.lastName?.trim(),
        title: user.title,
        email: user.email,
        phoneNumber: user.phoneNumber,
        phoneNumberCountryId: user.phoneNumberCountryId,
        adminBlockedDate: user.adminBlockedDate,
        createdAt: user.createdAt,
      })),
      page: users.page,
      pageSize: users.pageSize,
      count: users.count,
      pageCount: users.pageCount,
      pageNumberIsGood: users.pageNumberIsGood,
      hasPreviousPage: users.hasPreviousPage,
      hasNextPage: users.hasNextPage,
      isFirstPage: users.isFirstPage,
      isLastPage: users.isLastPage,
      numberOfFirstItemOnPage: users.numberOfFirstItemOnPage,
      firstItemOnPage: users.firstItemOnPage,
      numberOfLastItemOnPage: users.numberOfLastItemOnPage,
      lastItemOnPage: users.lastItemOnPage,
    };
  }
}
