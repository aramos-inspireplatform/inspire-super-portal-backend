import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IFindTenantDao } from '~/tenants/application/queries/contracts/find-tenant.dao.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class FindTenantDao implements IFindTenantDao {
  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(attrs: IFindTenantDao.Input): IFindTenantDao.Output {
    const tenant = await this.inspireTenantApiService.findOne({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
    });
    if (tenant instanceof Error) throw tenant;

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      googleTenantId: tenant.googleTenantId,
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
    };
  }
}
