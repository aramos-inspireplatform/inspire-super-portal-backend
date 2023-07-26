import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class TenantDomainEntity extends BaseDomainEntity {
  private name: string;
  private gTenantId: string;
  private agencyId: string;
  private agencyName: string;
  private termsRecurringIntervalCount: number;
  private termsRecurringIntervalId: string;
  private tenantStatusId: string;
  private totalPaidAmount: number;
  private lastTenantPayoutId: string;
  private tenantBalances: TenantBalanceDomainEntity[] = [];

  constructor(input?: Partial<TenantDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  create(input: TenantDomainEntity.Create) {
    const {
      id,
      name,
      gTenantId,
      agencyId,
      agencyName,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      tenantStatusId,
      tenantBalances,
    } = input;

    this.id = id;
    this.name = name;
    this.gTenantId = gTenantId;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringIntervalId = termsRecurringIntervalId;
    this.tenantStatusId = tenantStatusId;
    this.totalPaidAmount = 0;
    this.synchronizeTenantBalances({ tenantBalances });
  }

  synchronize(input: TenantDomainEntity.Synchronize) {
    const {
      name,
      agencyId,
      agencyName,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      tenantStatusId,
      tenantBalances,
    } = input;

    this.name = name;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringIntervalId = termsRecurringIntervalId;
    this.tenantStatusId = tenantStatusId;
    this.synchronizeTenantBalances({ tenantBalances });
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      gTenantId: this.gTenantId,
      agencyId: this.agencyId,
      agencyName: this.agencyName,
      termsRecurringIntervalCount: this.termsRecurringIntervalCount,
      termsRecurringIntervalId: this.termsRecurringIntervalId,
      tenantStatusId: this.tenantStatusId,
      totalPaidAmount: this.totalPaidAmount,
      lastTenantPayoutId: this.lastTenantPayoutId,
      tenantBalances: this.tenantBalances,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
  }

  // Tenant Balances
  private synchronizeTenantBalances({
    tenantBalances,
  }: {
    tenantBalances: TenantBalanceDomainEntity[];
  }) {
    this.deleteMissingTenantBalances({ tenantBalances });

    tenantBalances?.map((tenantBalance) => {
      const currentTenantBalance = this.tenantBalances?.find(
        (currentTenantBalance) =>
          currentTenantBalance.getState().settlementCurrencyId ==
          tenantBalance.getState().settlementCurrencyId,
      );
      if (currentTenantBalance)
        currentTenantBalance.updateAmount({
          amount: tenantBalance.getState().amount,
        });
      else this.tenantBalances.push(tenantBalance);
    });
  }

  private deleteMissingTenantBalances({
    tenantBalances,
  }: {
    tenantBalances: TenantBalanceDomainEntity[];
  }) {
    const newTenantBalancesSettlementCurrencyId = tenantBalances?.map(
      (tenantBalance) => tenantBalance.getState().settlementCurrencyId,
    );

    const missingTenantBalances = this.tenantBalances?.filter(
      (tenantBalance) =>
        !newTenantBalancesSettlementCurrencyId.includes(
          tenantBalance.getState().settlementCurrencyId,
        ),
    );

    missingTenantBalances?.map((tenantBalance) => {
      tenantBalance.delete();
    });
  }
}

export namespace TenantDomainEntity {
  export type Input = {
    id: string;
    name: string;
    gTenantId: string;
    agencyId: string;
    agencyName: string;
    termsRecurringIntervalCount: number;
    termsRecurringIntervalId: string;
    tenantStatusId: string;
    totalPaidAmount: number;
    lastTenantPayoutId: string;
    tenantBalances: TenantBalanceDomainEntity[];
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  export type State = Input & {
    //adittional methods here
  };

  export type Create = Pick<
    TenantDomainEntity.Input,
    | 'id'
    | 'name'
    | 'gTenantId'
    | 'agencyId'
    | 'agencyName'
    | 'termsRecurringIntervalCount'
    | 'termsRecurringIntervalId'
    //| 'termsRecurringInterval'
    | 'tenantStatusId'
    //| 'tenantStatus'
    | 'tenantBalances'
  > & {
    //
  };

  export type Synchronize = Pick<
    TenantDomainEntity.Input,
    | 'name'
    | 'agencyId'
    | 'agencyName'
    | 'termsRecurringIntervalCount'
    | 'termsRecurringIntervalId'
    //| 'termsRecurringInterval'
    | 'tenantStatusId'
    //| 'tenantStatus'
    | 'tenantBalances'
  > & {
    //
  };
}
