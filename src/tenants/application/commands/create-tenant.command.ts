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
    const tenantPendingStatuses = await this.tenantStatusesRepository.findById({
      id: TenantStatusesConstant.Pending,
    });

    const storedTenant = new Tenant({
      slug: attrs.tenant.slug,
      name: attrs.tenant.name,
      integrationCode: tenant.id,
      tenantStatus: tenantPendingStatuses,
      createdByUserId: attrs.currentUserId,
      createdByUserEmail: attrs.currentUserEmail,
      tenantId: tenant.googleTenantId,
    });
    await this.tenantRepository.save({ tenant: storedTenant });

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      gTenantId: tenant.googleTenantId,
      logo: tenant.logo,
      accountName: tenant.accountName,
      publicBusinessName: tenant.publicBusinessName,
    };
  }
}
