import { CurrenciesEntity } from '~/currencies/domain/entities/currencies.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

export class TenantBalancesEntity extends BaseDomainEntity {
  tenantId: string;
  settlementCurrenciesId: string;
  amount: number;
  settlementCurrency: CurrenciesEntity;
  tenant: Tenant;

  constructor(attrs: InstanceProperties<TenantBalancesEntity>) {
    super(attrs);
    this.tenantId = attrs?.tenantId;
    this.settlementCurrenciesId = attrs?.settlementCurrenciesId;
    this.amount = attrs?.amount;
    this.settlementCurrency = attrs?.settlementCurrency;
    this.tenant = attrs?.tenant;
  }
}
