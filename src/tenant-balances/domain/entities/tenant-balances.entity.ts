import { CurrenciesEntity } from '~/currencies/domain/entities/currencies.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

export class TenantBalancesEntity extends BaseDomainEntity {
  tenantsId: string;
  settlementCurrenciesId: string;
  amount: string;
  settlementCurrencies: CurrenciesEntity;
  tenants: Tenant;

  constructor(attrs: InstanceProperties<TenantBalancesEntity>) {
    super(attrs);
    this.tenantsId = attrs?.tenantsId;
    this.settlementCurrenciesId = attrs?.settlementCurrenciesId;
    this.amount = attrs?.amount;
    this.settlementCurrencies = attrs?.settlementCurrencies;
    this.tenants = attrs?.tenants;
  }
}
