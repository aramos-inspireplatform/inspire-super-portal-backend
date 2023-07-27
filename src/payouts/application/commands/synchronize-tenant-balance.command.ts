import { ISynchronizeTenantBalanceCommand } from '~/payouts/application/commands';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';
import { TenantStatusDomainEntity } from '~/payouts/domain/entities/tenant-status.entity';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';
import {
  ITenantRepository,
  ITenantStatusRepository,
} from '~/payouts/domain/repositories';
import { BadRequestException } from '~/shared/domain/exceptions';

export class SynchronizeTenantBalanceCommand
  implements ISynchronizeTenantBalanceCommand
{
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusRepository: ITenantStatusRepository,
  ) {
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

    const gTenantIdCheck = await this.getTenantByGTenantId({
      gTenantId: gTenantId,
    });
    if (gTenantIdCheck && gTenantIdCheck.id !== tenant?.id)
      throw new BadRequestException(
        PayoutsExceptionsConstants.TENANT_GTENANTID_ALREADY_IN_USE,
      );

    const tenantStatus = await this.getTenantStatusById({
      tenantStatusId: status?.id,
    });

    if (tenant) {
      tenant.synchronize({
        name: name,
        gTenantId: gTenantId,
        agencyId: agency.id,
        agencyName: agency.name,
        termsRecurringIntervalCount: terms.recurringIntervalCount,
        termsRecurringIntervalId: terms.recurringIntervalId,
        tenantStatus: tenantStatus,
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
        tenantStatus: tenantStatus,
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

  private async getTenantStatusById({
    tenantStatusId,
  }: {
    tenantStatusId: string;
  }): Promise<TenantStatusDomainEntity> {
    const tenantStatus = await this.tenantStatusRepository.findOneById({
      id: tenantStatusId,
    });

    return tenantStatus;
  }
}
