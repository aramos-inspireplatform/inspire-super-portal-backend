import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IFindAllTenantsDao } from '~/tenants/application/daos/find-all-tenants.dao.contract';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';

export class FindAllTenantsDao implements IFindAllTenantsDao {
  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(attrs: IFindAllTenantsDao.Input): IFindAllTenantsDao.Output {
    const tenants = await this.inspireTenantApiService.findAllTenants({
      accessToken: attrs.accessToken,
      pagination: attrs.pagination,
    });
    if (tenants instanceof Error) throw tenants;

    return {
      rows: tenants.rows.map((tenant) => ({
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        gTenantId: tenant.googleTenantId,
        logo: tenant.logo,
        accountName: tenant.accountName,
        publicBusinessName: tenant.publicBusinessName,
        supportEmail: tenant.supportEmail,
        supportPhoneNumber: tenant.supportPhoneNumber,
        showPhoneOnInvoiceAndReceipt: tenant.showPhoneOnInvoiceAndReceipt,
        statementDescriptor: tenant.statementDescriptor,
        shortenedDescriptor: tenant.shortenedDescriptor,
        businessWebsite: tenant.businessWebsite,
        supportWebsite: tenant.supportWebsite,
        privacyPolicy: tenant.privacyPolicy,
        termsOfService: tenant.termsOfService,
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
              utcOffset: tenant.timezone.utcOffset,
              utcDstOffset: tenant.timezone.utcDstOffset,
            }
          : null,
        language: tenant.language
          ? {
              id: tenant.language.id,
              name: tenant.language.name,
              isoCode: tenant.language.isoCode,
            }
          : null,
        currencies: tenant.currencies,
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
        settings: tenant.settings,
        termsRecurringIntervalCount: tenant.termsRecurringIntervalCount,
        termsRecurringInterval: tenant.termsRecurringInterval
          ? {
              uuid: tenant.termsRecurringInterval.uuid,
              name: tenant.termsRecurringInterval.name,
              interval: tenant.termsRecurringInterval.interval,
              isActive: tenant.termsRecurringInterval.isActive,
            }
          : null,
        createdBy: tenant.createdBy,
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
