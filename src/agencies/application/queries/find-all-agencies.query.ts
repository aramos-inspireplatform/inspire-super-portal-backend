import { IFindAllAgenciesDao } from '~/agencies/application/daos/find-all-agencies.dao.contract';
import { IFindAllAgenciesQuery } from '~/agencies/application/queries/contracts/find-all-agencies.query.contract';

export class FindAllAgenciesQuery implements IFindAllAgenciesQuery {
  constructor(private readonly findAllUserAgenciesDao: IFindAllAgenciesDao) {}

  async execute(
    attrs: IFindAllAgenciesQuery.Input,
  ): IFindAllAgenciesQuery.Output {
    const agencies = await this.findAllUserAgenciesDao.execute({
      accessToken: attrs.accessToken,
      searchParams: {
        keywords: attrs.searchParams?.keywords,
        page: attrs.searchParams?.page,
        pageSize: attrs.searchParams?.pageSize,
        sortBy: attrs.searchParams?.sortBy,
      },
    });

    return {
      rows: agencies.rows.map((agency) => ({
        id: agency.id,
        name: agency.name,
        defaultTenant: agency.defaultTenantId
          ? {
              id: agency.defaultTenantId.id,
              name: agency.defaultTenantId.name,
              settings: agency.defaultTenantId.settings,
            }
          : null,
      })),
      page: agencies.page,
      pageSize: agencies.pageSize,
      count: agencies.count,
      pageCount: agencies.pageCount,
      pageNumberIsGood: agencies.pageNumberIsGood,
      hasPreviousPage: agencies.hasPreviousPage,
      hasNextPage: agencies.hasNextPage,
      isFirstPage: agencies.isFirstPage,
      isLastPage: agencies.isLastPage,
      numberOfFirstItemOnPage: agencies.numberOfFirstItemOnPage,
      firstItemOnPage: agencies.firstItemOnPage,
      numberOfLastItemOnPage: agencies.numberOfLastItemOnPage,
      lastItemOnPage: agencies.lastItemOnPage,
    };
  }
}
