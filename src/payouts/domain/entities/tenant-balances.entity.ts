import { CurrencyDomainEntity } from '~/payouts/domain/entities/currency.entity';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class TenantBalanceDomainEntity extends BaseDomainEntity {
  private tenantId: string;
  private tenant: TenantDomainEntity;
  private settlementCurrencyId: string;
  private settlementCurrency: CurrencyDomainEntity;
  private amount: number;

  constructor(input?: Partial<TenantBalanceDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  synchronize(input: TenantBalanceDomainEntity.Synchronize) {
    const { settlementCurrencyId, amount } = input;

    this.settlementCurrencyId = settlementCurrencyId;
    this.updateAmount({ amount });
  }

  updateAmount(input: TenantBalanceDomainEntity.UpdateAmount) {
    const { amount } = input;

    this.amount = amount;
  }

  delete() {
    this.deletedDate = new Date();
  }

  getState() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      tenant: this.tenant,
      settlementCurrencyId: this.settlementCurrencyId,
      settlementCurrency: this.settlementCurrency,
      amount: this.amount,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
  }
}

export namespace TenantBalanceDomainEntity {
  export type Input = {
    id: string;
    tenantId: string;
    tenant: TenantDomainEntity;
    settlementCurrencyId: string;
    settlementCurrency: CurrencyDomainEntity;
    amount: number;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  export type State = Input & {
    //adittional methods here
  };

  export type Create = Pick<
    TenantBalanceDomainEntity.Input,
    | 'id'
    | 'tenantId'
    | 'tenant'
    | 'settlementCurrencyId'
    | 'settlementCurrency'
    | 'amount'
  > & {
    //
  };

  export type Synchronize = Pick<
    TenantBalanceDomainEntity.Input,
    'settlementCurrencyId' | 'amount'
  > & {
    //
  };

  export type UpdateAmount = Pick<TenantBalanceDomainEntity.Input, 'amount'> & {
    //
  };
}
