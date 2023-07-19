import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';

export class TenantAssembler {
  static assembly(input: Partial<TenantAssembler.Input>): TenantDomainEntity {
    if (!input) return new TenantDomainEntity();
    return new TenantDomainEntity({
      id: input.id,
      name: input.name,
      gTenantId: input.googleTenantId,
      termsRecurringIntervalCount: input.termsRecurringIntervalCount,
      termsRecurringIntervalId: input.termsRecurringIntervalId,
    });
  }
}

export namespace TenantAssembler {
  export type Input = {
    id: string;
    name: string;
    googleTenantId: string;
    termsRecurringIntervalCount: number;
    termsRecurringIntervalId: string;
  };
}
