import { IFindOneTenantDao as IFindOneTenantDao } from '~/tenants/application/daos/find-one-tenant.dao.contract';
import { IFindTenantQuery as IFindOneTenantQuery } from '~/tenants/application/queries/contracts/find-tenant.query.contract';

export class FindOneTenantQuery implements IFindOneTenantQuery {
  constructor(private readonly findOneTenantDao: IFindOneTenantDao) {}

  async execute(attrs: IFindOneTenantQuery.Input): IFindOneTenantQuery.Output {
    const tenant = await this.findOneTenantDao.execute({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
    });
    if (tenant instanceof Error) throw tenant;

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      gTenantId: tenant.googleTenantId,
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
      settings: tenant.settings,
    };
  }
}
