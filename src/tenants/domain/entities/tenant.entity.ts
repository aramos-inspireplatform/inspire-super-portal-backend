import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';
import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';

export class Tenant extends BaseDomainEntity {
  name: string;
  googleTenantId: string;
  agencyId: string;
  agencyName: string;
  termsRecurringIntervalCount: number;
  termsRecurringInterval: RecurringInterval;
  tenantStatus: TenantStatus;
  totalPaidAmount: number;
  //lastTenantPayout: Payout;

  constructor(attrs: InstanceProperties<Tenant>) {
    super(attrs);
    this.name = attrs.name;
    this.googleTenantId = attrs.googleTenantId;
    this.agencyId = attrs.agencyId;
    this.agencyName = attrs.agencyName;
    this.termsRecurringIntervalCount = attrs.termsRecurringIntervalCount;
    this.termsRecurringInterval = attrs.termsRecurringInterval;
    this.tenantStatus = attrs.tenantStatus;
    this.totalPaidAmount = attrs.totalPaidAmount;
    //this.lastTenantPayout = attrs.lastTenantPayout;
  }
}
