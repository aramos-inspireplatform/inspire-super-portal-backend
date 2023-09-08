import { TenantsDataMapper } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RecurringIntervalsMapper } from '~/shared/infra/database/mapper/recurring-intervals.mapper';
import { TenantStatusesMapper } from '~/shared/infra/database/mapper/tenant-statuses.mapper';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

// TODO: AQ???

export const TenantMapper: IMapper<Tenant, TenantsDataMapper> = {
  domainToModel: (domain: Tenant): TenantsDataMapper => {
    const model = new TenantsDataMapper();
    model.id = domain.id;
    model.name = domain.name;
    model.googleTenantId = domain.googleTenantId;
    model.agencyId = domain.agencyId;
    model.agencyName = domain.agencyName;
    model.termsRecurringIntervalCount = domain.termsRecurringIntervalCount;
    model.termsRecurringInterval = <any>{
      id: domain.termsRecurringInterval.id,
    };
    model.tenantStatus = <any>{ id: domain.tenantStatus.id };
    model.totalPaidAmount = domain.totalPaidAmount;
    model.lastTenantPayout = <any>{ id: domain.lastTenantPayout.id };
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: TenantsDataMapper): Tenant => {
    const domain = new Tenant({
      id: model.id,
      name: model.name,
      googleTenantId: model.googleTenantId,
      tenantStatus: TenantStatusesMapper.modelToDomain(model.tenantStatus),
      agencyId: model.agencyId,
      agencyName: model.agencyName,
      termsRecurringIntervalCount: model.termsRecurringIntervalCount,
      termsRecurringInterval: RecurringIntervalsMapper.modelToDomain(
        model.termsRecurringInterval,
      ),
      totalPaidAmount: model.totalPaidAmount,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
      lastTenantPayout: model.lastTenantPayout,
      dualPricingDiscountAmount: model.dualPricingDiscountAmount,
      isDualPricingActive: model.isDualPricingActive,
    });
    return domain;
  },
};
