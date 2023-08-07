import { CurrencyAssembler } from '~/payouts/application/assemblers/currency.assembler';
import { TenantAssembler } from '~/payouts/application/assemblers/tenant.assembler';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';

export class TenantBalanceAssembler {
  static assembly(
    input: Partial<TenantBalanceAssembler.Input>,
  ): TenantBalanceDomainEntity {
    if (!input) return new TenantBalanceDomainEntity();
    return new TenantBalanceDomainEntity({
      id: input.id,
      tenantId: input.tenantId,
      tenant: TenantAssembler.assembly(input.tenant),
      settlementCurrencyId: input.settlementCurrencyId,
      settlementCurrency: CurrencyAssembler.assembly(input?.settlementCurrency),
      amount: input.amount,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
    });
  }
}

export namespace TenantBalanceAssembler {
  export type Input = {
    id: string;
    tenantId: string;
    tenant: TenantAssembler.Input;
    settlementCurrencyId: string;
    settlementCurrency: CurrencyAssembler.Input;
    amount: number;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };
}
