import { ISynchronizeTenantBalanceCommand } from '~/payouts/application/commands';
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
    const { tenant, agency, status, terms } = input;

    let tenantDb = await this.getTenant({ tenantId: tenant.id });
    if (tenantDb) {
      tenantDb.synchronize({
        name: tenant.name,
        gTenantId: tenant.gTenantId,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatusId: status.id,
        //tenantBalances: null,
      });
    } else {
      tenantDb = new TenantDomainEntity();
      tenantDb.create({
        id: tenant.id,
        name: tenant.name,
        gTenantId: tenant.gTenantId,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatusId: status.id,
        //tenantBalances: null,
      });
    }

    this.tenantRepository.save(tenantDb);
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
