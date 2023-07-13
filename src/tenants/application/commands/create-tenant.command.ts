import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { ICreateTenantCommand } from '~/tenants/application/commands/contracts/create-tenant.contract';
import { RecurringIntervalsConstant } from '~/tenants/domain/constants/recurring-intervals.constant';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';
import { IRecurringIntervalsRepository } from '~/tenants/domain/repositories/recurring-intervals-repository.contract';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/domain/repositories/tenant-statuses-repository.contract';

export class CreateTenantCommand implements ICreateTenantCommand {
  private readonly CREATE_TENANT_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusesRepository: ITenantStatusesRepository,
    private readonly recurringIntervalsRepository: IRecurringIntervalsRepository,
  ) {}

  async execute(
    attrs: ICreateTenantCommand.Input,
  ): ICreateTenantCommand.Output {
    const tenant = await this.inspireTenantService.create({
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
      },
    });
    if (tenant instanceof Error) throw tenant;

    //TODO: move this to request modules and discard tenants table
    const pendingTenantStatus = await this.tenantStatusesRepository.findById({
      id: tenant.status?.uuid,
    });

    const dailyRecurringInterval =
      await this.recurringIntervalsRepository.findById({
        id: RecurringIntervalsConstant.Daily,
      });

    const storedTenant = new Tenant({
      id: tenant.uuid,
      name: tenant.name,
      googleTenantId: tenant.googleTenantId,
      agencyId: tenant.agency?.uuid,
      agencyName: tenant.agency?.name,
      termsRecurringIntervalCount: 30, //TODO: Change termsRecurringIntervalCount on tenant creation
      termsRecurringInterval: dailyRecurringInterval, //monthlyRecurringInterval, //TODO: Change termsRecurringInterval on tenant creation
      tenantStatus: pendingTenantStatus,
      totalPaidAmount: 0,
      lastTenantPayout: null,
      tenantBalances: null,
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
