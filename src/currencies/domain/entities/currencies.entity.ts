import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';

export class CurrenciesEntity extends BaseDomainEntity {
  name: string;
  symbol: string;
  isoCode: string;
  tenantBalances: TenantBalanceDomainEntity[];
  tenantPayouts: TenantPayoutsEntity[];

  constructor(attrs: InstanceProperties<CurrenciesEntity>) {
    super(attrs);
    this.name = attrs?.name;
    this.symbol = attrs?.symbol;
    this.isoCode = attrs?.isoCode;
    this.tenantBalances = attrs?.tenantBalances;
    this.tenantPayouts = attrs?.tenantPayouts;
  }
}
