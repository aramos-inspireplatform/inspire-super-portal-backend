import { IFindAllAdminUsersDao } from '~/users/application/queries/contracts/find-all-admin-users.dao.contract';
import { IFindAllAdminUsersQuery } from '~/users/application/queries/contracts/find-all-admin-users.query.contract';

export class FindAllAdminUsersQuery implements IFindAllAdminUsersQuery {
  constructor(private readonly findAllAdminUsersDao: IFindAllAdminUsersDao) {}

  async execute(
    attrs: IFindAllAdminUsersQuery.Input,
  ): IFindAllAdminUsersQuery.Output {
    const users = await this.findAllAdminUsersDao.execute({
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
          user.firstName.trim() +
          (user.lastName ? ' ' + user.lastName?.trim() : ''),
        firstName: user.firstName?.trim(),
        lastName: user.lastName?.trim(),
        title: user.title,
        email: user.email,
        phoneNumber: user.phoneNumber,
        phoneNumberCountryId: user.phoneNumberCountryId,
        agencyCount: user.agencyCount,
        userType: user.userType,
        createdAt: user.createdAt,
        adminBlockedDate: user.adminBlockedDate,
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
