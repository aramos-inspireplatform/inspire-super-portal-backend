import { UnprocessableEntityException } from '@nestjs/common';
import { ISynchronizeTenantBalanceCommand } from '~/payouts/application/commands';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';
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

    let tenant = await this.getTenantById({ tenantId: tenantId });
    if (tenant) {
      tenant.synchronize({
        name: name,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatusId: status.id,
        tenantBalances: tenantBalances,
      });
    } else {
      const tenantCheck = await this.getTenantByGTenantId({
        gTenantId: gTenantId,
      });
      if (tenantCheck)
        throw new UnprocessableEntityException(
          PayoutsExceptionsConstants.TENANT_GTENANTID_ALREADY_IN_USE,
        );

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

  private async getTenantById({
    tenantId,
  }: {
    tenantId: string;
  }): Promise<TenantDomainEntity> {
    const tenant = await this.tenantRepository.findOneById({
      id: tenantId,
    });

    return tenant;
  }

  private async getTenantByGTenantId({
    gTenantId,
  }: {
    gTenantId: string;
  }): Promise<TenantDomainEntity> {
    const tenant = await this.tenantRepository.findOneByGTenantId({
      gTenantId: gTenantId,
    });

    return tenant;
  }
}
