import { TenantBalanceAssembler } from '~/payouts/application/assemblers/tenant-balance.assembler';
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
      tenantBalances: input.tenantBalances?.map((tenantBalance) =>
        TenantBalanceAssembler.assembly(tenantBalance),
      ),
      totalPaidAmount: input.totalPaidAmount,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
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
    tenantBalances: TenantBalanceAssembler.Input[];
    totalPaidAmount: number;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };
}
