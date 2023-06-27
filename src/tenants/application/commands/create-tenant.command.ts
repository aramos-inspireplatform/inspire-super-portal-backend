import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { ICreateTenantCommand } from '~/tenants/application/commands/contracts/create-tenant.contract';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';

export class CreateTenantCommand implements ICreateTenantCommand {
  private readonly CREATE_TENANT_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusesRepository: ITenantStatusesRepository,
  ) {}

  async execute(
    attrs: ICreateTenantCommand.Input,
  ): ICreateTenantCommand.Output {
    const tenant = await this.inspireTenantService.create({
      accessToken: attrs.accessToken,
      currentUser: attrs.currentUser,
      tenant: {
        name: attrs.tenant.name,
        accountName: attrs.tenant.accountName,
        slug: attrs.tenant.slug,
        countryId: attrs.tenant.countryId,
        settings: attrs.tenant.settings,
        agencyId: attrs.tenant.agencyId,
        timezoneId: attrs.tenant.timezoneId,
        languageId: attrs.tenant.languageId,
      },
    });
    if (tenant instanceof Error) throw tenant;

    //TODO: move this to request modules and discard tenants table
    const tenantPendingStatuses = await this.tenantStatusesRepository.findById({
      id: TenantStatusesConstant.Pending,
    });
    const storedTenant = new Tenant({
      slug: attrs.tenant.slug,
      name: attrs.tenant.name,
      integrationCode: tenant.id,
      tenantStatus: tenantPendingStatuses,
      createdByUserId: attrs.currentUser,
      createdByUserEmail: 'ALTERAR@ALTERAR.com', //attrs.email,
      tenantId: tenant.googleTenantId,
    });
    await this.tenantRepository.save({ tenant: storedTenant });

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      googleTenantId: tenant.googleTenantId,
      logo: tenant.logo,
      accountName: tenant.accountName,
      publicBusinessName: tenant.publicBusinessName,
      // supportEmail: tenant.supportEmail,
      // supportPhoneNumber: tenant.supportPhoneNumber,
      // showPhoneOnInvoiceAndReceipt: tenant.showPhoneOnInvoiceAndReceipt,
      // statementDescriptor: tenant.statementDescriptor,
      // shortenedDescriptor: tenant.shortenedDescriptor,
      // businessWebsite: tenant.businessWebsite,
      // supportWebsite: tenant.supportWebsite,
      // privacyPolicy: tenant.privacyPolicy,
      // termsOfService: tenant.termsOfService,
      // timezone: tenant.timezone,
      // languages: tenant.languages,
      // currencies: tenant.currencies,
      // countries: tenant.countries,
      // userEmail: tenant.userEmail,
    };
  }
}
