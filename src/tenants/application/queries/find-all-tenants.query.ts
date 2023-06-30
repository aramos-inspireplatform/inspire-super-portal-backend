import { IFindAllTenantsDao } from '~/tenants/application/daos/find-all-tenants.dao.contract';
import { IFindAllTenantsQuery } from '~/tenants/application/queries/contracts/find-all-tenants.query.contract';

export class FindAllTenantsQuery implements IFindAllTenantsQuery {
  constructor(private readonly findAllTenantsDao: IFindAllTenantsDao) {}

  async execute(
    attrs: IFindAllTenantsQuery.Input,
  ): IFindAllTenantsQuery.Output {
    const tenants = await this.findAllTenantsDao.execute({
      accessToken: attrs.accessToken,
      pagination: attrs.pagination,
    });
    if (tenants instanceof Error) throw tenants;

    return {
      rows: tenants.rows.map((tenant) => ({
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        gTenantId: tenant.gTenantId,
        logo: tenant.logo,
        accountName: tenant.accountName,
        publicBusinessName: tenant.publicBusinessName,
        createdAt: tenant.createdAt,
        agency: tenant.agency
          ? {
              id: tenant.agency.id,
              name: tenant.agency.name,
              logo: tenant.agency.logo,
            }
          : null,
        timezone: tenant.timezone
          ? {
              id: tenant.timezone.id,
              name: tenant.timezone.name,
              countryIsoCode: tenant.timezone.countryIsoCode,
            }
          : null,
        language: tenant.language
          ? {
              id: tenant.language.id,
              name: tenant.language.name,
              isoCode: tenant.language.isoCode,
            }
          : null,
        //currencies: tenant.currencies,
        country: tenant.country
          ? {
              id: tenant.country.id,
              name: tenant.country.name,
              code: tenant.country.code,
              flagSvgUrl: tenant.country.flagSvgUrl,
            }
          : null,
        status: tenant.status
          ? {
              id: tenant.status.id,
              name: tenant.status.name,
              slug: tenant.status.slug,
            }
          : null,
      })),
      page: tenants.page,
      pageSize: tenants.pageSize,
      count: tenants.count,
      pageCount: tenants.pageCount,
      pageNumberIsGood: tenants.pageNumberIsGood,
      hasPreviousPage: tenants.hasPreviousPage,
      hasNextPage: tenants.hasNextPage,
      isFirstPage: tenants.isFirstPage,
      isLastPage: tenants.isLastPage,
      numberOfFirstItemOnPage: tenants.numberOfFirstItemOnPage,
      firstItemOnPage: tenants.firstItemOnPage,
      numberOfLastItemOnPage: tenants.numberOfLastItemOnPage,
      lastItemOnPage: tenants.lastItemOnPage,
    };
  }
}
