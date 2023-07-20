import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class TenantDomainEntity extends BaseDomainEntity {
  name: string;
  gTenantId: string;
  termsRecurringIntervalCount: number;
  termsRecurringIntervalId: string;

  constructor(input?: Partial<TenantDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      gTenantId: this.gTenantId,
      termsRecurringIntervalCount: this.termsRecurringIntervalCount,
      termsRecurringIntervalId: this.termsRecurringIntervalId,
    };
  }
}

export namespace TenantDomainEntity {
  export type Input = {
    id: string;
    createdDate: Date;
    updatedDate: Date;
    name: string;
    gTenantId: string;
    termsRecurringIntervalCount: number;
    termsRecurringIntervalId: string;
  };

  export type State = Input & {
    //adittional methods here
  };
}
