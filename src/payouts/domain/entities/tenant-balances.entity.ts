import { PayoutStatusesEntity } from '~/payout-statuses/domain/entities/payout-statuses.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { Currencies } from '~/shared/infra/database/entities';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

export class TenantBalancesEntity extends BaseDomainEntity {
  tenantId: Tenant;
  settlementCurrency: Currencies;
  amount: number;

  constructor(attrs: InstanceProperties<TenantBalancesEntity>) {
    super(attrs);
    this.tenantId = attrs?.tenantId;
    this.settlementCurrency = attrs?.settlementCurrency;
    this.amount = attrs?.amount;
  }
}
