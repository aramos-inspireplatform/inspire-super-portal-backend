import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { ICreateTenantCommand } from '~/tenants/application/commands/contracts/create-tenant.contract';
import { RecurringIntervalsConstant } from '~/tenants/domain/constants/recurring-intervals.constant';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';
import { IRecurringIntervalsRepository } from '~/tenants/domain/repositories/recurring-intervals-repository.contract';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/domain/repositories/tenant-statuses-repository.contract';

export class CreateTenantCommand implements ICreateTenantCommand {
  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusesRepository: ITenantStatusesRepository,
    private readonly recurringIntervalsRepository: IRecurringIntervalsRepository,
  ) {}

  async execute(
    attrs: ICreateTenantCommand.Input,
  ): ICreateTenantCommand.Output {
    const termsRecurringIntervalId =
      attrs.tenant?.termsRecurringIntervalId ||
      RecurringIntervalsConstant.Daily;

    const termsRecurringIntervalCount =
      attrs.tenant?.termsRecurringIntervalCount || 30;

    const tenant = await this.inspireTenantService.createTenant({
      accessToken: attrs.accessToken,
      currentUser: attrs.currentUserId,
      tenant: {
        name: attrs.tenant.name,
        accountName: attrs.tenant.accountName,
        slug: attrs.tenant.slug,
        countryId: attrs.tenant.countryId,
        settings: attrs.tenant.settings,
        agencyId: attrs.tenant.agencyId,
        timezoneId: attrs.tenant.timezoneId,
        languageId: attrs.tenant.languageId,
        termsRecurringIntervalCount,
        termsRecurringIntervalId,
      },
    });
    if (tenant instanceof Error) throw tenant;

    //TODO: move this to request modules and discard tenants table
    const pendingTenantStatus = await this.tenantStatusesRepository.findById({
      id: tenant.status?.uuid,
    });

    const recurringInterval = await this.recurringIntervalsRepository.findById({
      id: termsRecurringIntervalId,
    });

    const storedTenant = new Tenant({
      id: tenant.uuid,
      name: tenant.name,
      googleTenantId: tenant.googleTenantId,
      agencyId: tenant.agency?.uuid,
      agencyName: tenant.agency?.name,
      termsRecurringIntervalCount,
      termsRecurringInterval: recurringInterval,
      tenantStatus: pendingTenantStatus,
      totalPaidAmount: 0,
      lastTenantPayout: null,
    });
    await this.tenantRepository.save({ tenant: storedTenant });

    return {
      id: tenant.uuid,
      name: tenant.name,
      slug: tenant.slug,
      gTenantId: tenant.googleTenantId,
      logo: tenant.logo,
      accountName: tenant.accountName,
      publicBusinessName: tenant.publicBusinessName,
    };
  }
}
