import { ISynchronizeTenantBalanceCommand } from '~/payouts/application/commands';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { ITenantRepository } from '~/payouts/infra/repositories/contracts';

export class SynchronizeTenantBalanceCommand
  implements ISynchronizeTenantBalanceCommand
{
  constructor(private readonly tenantRepository: ITenantRepository) {
    //
  }

  async execute(
    input: ISynchronizeTenantBalanceCommand.Input,
  ): ISynchronizeTenantBalanceCommand.Output {
    const { tenantId, gTenantId, name, agency, status, terms, balances } =
      input;

    const tenantBalances = balances?.map((balance) => {
      const tenantBalance = new TenantBalanceDomainEntity();
      tenantBalance.synchronize({
        settlementCurrencyId: balance.settlementCurrencyId,
        amount: balance.amount,
      });

      return tenantBalance;
    });

    let tenant = await this.getTenant({ tenantId: tenantId });
    if (tenant) {
      tenant.synchronize({
        name: name,
        gTenantId: gTenantId,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatusId: status.id,
        tenantBalances: tenantBalances,
      });
    } else {
      tenant = new TenantDomainEntity();
      tenant.create({
        id: tenantId,
        name: name,
        gTenantId: gTenantId,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatusId: status.id,
        tenantBalances: tenantBalances,
      });
    }

    this.tenantRepository.save(tenant);
  }

  private async getTenant({
    tenantId,
  }: {
    tenantId: string;
  }): Promise<TenantDomainEntity> {
    const tenant = await this.tenantRepository.findOneById({
      id: tenantId,
    });

    return tenant;
  }
}
