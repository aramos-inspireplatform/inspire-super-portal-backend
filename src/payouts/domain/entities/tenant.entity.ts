import { PayoutDomainEntity } from '~/payouts/domain/entities/payout.entity';
import { RecurringIntervalDomainEntity } from '~/payouts/domain/entities/recurring-interval.entity';
import { TenantBalanceDomainEntity } from '~/payouts/domain/entities/tenant-balances.entity';
import { TenantStatusDomainEntity } from '~/payouts/domain/entities/tenant-status.entity';
import {
  PayoutStatusesEnum,
  TenantStatusesEnum,
  TenantsEnum,
} from '~/payouts/domain/enums';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import {
  BadRequestException,
  NotFoundException,
} from '~/shared/domain/exceptions';

export class TenantDomainEntity extends BaseDomainEntity {
  private name: string;
  private gTenantId: string;
  private agencyId: string;
  private agencyName: string;
  private termsRecurringIntervalCount: number;
  private termsRecurringInterval: RecurringIntervalDomainEntity;
  private tenantStatus: TenantStatusDomainEntity;
  private totalPaidAmount: number;
  private lastTenantPayoutId: string;
  private lastTenantPayout: PayoutDomainEntity;
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
      termsRecurringInterval,
      tenantStatus,
      tenantBalances,
    } = input;

    this.id = id;
    this.name = name;
    this.gTenantId = gTenantId;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringInterval = termsRecurringInterval;
    this.tenantStatus = tenantStatus;
    this.totalPaidAmount = 0;
    this.synchronizeTenantBalances({ tenantBalances });

    this.validateCreate();
  }

  synchronize(input: TenantDomainEntity.Synchronize) {
    const {
      name,
      gTenantId,
      agencyId,
      agencyName,
      termsRecurringIntervalCount,
      termsRecurringInterval,
      tenantStatus,
      tenantBalances,
    } = input;

    this.name = name;
    this.gTenantId = gTenantId;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringInterval = termsRecurringInterval;
    this.tenantStatus = tenantStatus;
    this.synchronizeTenantBalances({ tenantBalances });

    this.validateSynchronize();
  }

  updateLastTenantPayout(input: TenantDomainEntity.UpdateLastTenantPayout) {
    const { lastTenantPayout } = input;

    this.lastTenantPayoutId = lastTenantPayout?.id;
    this.lastTenantPayout = lastTenantPayout;

    this.validateUpdateLastTenantPayout();
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      gTenantId: this.gTenantId,
      agencyId: this.agencyId,
      agencyName: this.agencyName,
      termsRecurringIntervalCount: this.termsRecurringIntervalCount,
      termsRecurringInterval: this.termsRecurringInterval,
      tenantStatus: this.tenantStatus,
      totalPaidAmount: this.totalPaidAmount,
      lastTenantPayout: this.lastTenantPayout,
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

  // Validations
  private validateCreate() {
    this.validateName();
    this.validateGTenantId();
    this.validateAgency();
    this.validateTermsRecurringInterval();
    this.validateTenantStatus();
    this.validateTotalPaidAmount();
    this.validateTenantBalances();
  }

  private validateSynchronize() {
    this.validateName();
    this.validateGTenantId();
    this.validateAgency();
    this.validateTermsRecurringInterval();
    this.validateTenantStatus();
    this.validateTotalPaidAmount();
    this.validateTenantBalances();
  }

  private validateUpdateLastTenantPayout() {
    this.validateLastTenantPayout();
  }

  private validateName() {
    if (!this.name)
      throw new NotFoundException(TenantsEnum.Exceptions.NAME_IS_REQUIRED);

    if (this.name.length > 200)
      throw new BadRequestException(TenantsEnum.Exceptions.NAME_MAX_CHARACTERS);
  }

  private validateGTenantId() {
    if (!this.gTenantId)
      throw new NotFoundException(TenantsEnum.Exceptions.GTENANTID_IS_REQUIRED);

    if (this.gTenantId.length > 100)
      throw new BadRequestException(
        TenantsEnum.Exceptions.GTENANTID_MAX_CHARACTERS,
      );
  }

  private validateAgency() {
    if (!this.agencyId && this.agencyName)
      throw new NotFoundException(TenantsEnum.Exceptions.AGENCY_ID_IS_REQUIRED);

    if (this.agencyId && !this.agencyName)
      throw new NotFoundException(
        TenantsEnum.Exceptions.AGENCY_NAME_IS_REQUIRED,
      );

    if (!this.agencyId) return;

    if (this.agencyId.length > 36)
      //TODO: validate if is a UUID
      throw new BadRequestException(
        TenantsEnum.Exceptions.AGENCY_ID_IS_MUST_BE_UUID,
      );

    if (this.agencyName.length > 200)
      throw new BadRequestException(
        TenantsEnum.Exceptions.AGENCY_NAME_MAX_CHARACTERS,
      );
  }

  private validateTermsRecurringInterval() {
    if (!this.termsRecurringIntervalCount)
      throw new NotFoundException(
        TenantsEnum.Exceptions.TERMS_RECURRING_INTERVAL_COUNT_IS_REQUIRED,
      );

    if (this.termsRecurringIntervalCount <= 0)
      throw new BadRequestException(
        TenantsEnum.Exceptions.TERMS_RECURRING_INTERVAL_COUNT_MUST_BE_GREATER_THEN_ZERO,
      );

    if (!this.termsRecurringInterval)
      throw new NotFoundException(
        TenantsEnum.Exceptions.TERMS_RECURRING_INTERVAL_IS_REQUIRED,
      );
  }

  private validateTenantStatus() {
    if (!this.tenantStatus)
      throw new NotFoundException(TenantStatusesEnum.Exceptions.NOT_FOUND);
  }

  private validateTotalPaidAmount() {
    if (this.totalPaidAmount === null || this.totalPaidAmount === undefined)
      throw new NotFoundException(
        TenantsEnum.Exceptions.TOTAL_PAID_AMOUNT_IS_REQUIRED,
      );

    if (this.totalPaidAmount < 0)
      throw new BadRequestException(
        TenantsEnum.Exceptions.TOTAL_PAID_AMOUNT_MUST_BE_GREATER_OR_EQUAL_THEN_ZERO,
      );
  }

  private validateTenantBalances() {
    if (!this.tenantBalances?.length) return;

    const settlementCurrencies = this.tenantBalances.map(
      (tenantBalance) => tenantBalance.getState().settlementCurrencyId,
    );
    const uniqueSettlementCurrencies = new Set(settlementCurrencies);
    if (settlementCurrencies.length !== uniqueSettlementCurrencies.size)
      throw new BadRequestException(
        TenantsEnum.Exceptions.TENANT_BALANCES_MUST_HAVE_ONE_OF_EACH_SETTLEMENT_CURRENCY,
      );
  }

  private validateLastTenantPayout() {
    if (!this.lastTenantPayout) return;

    if (this.lastTenantPayout.statusId !== PayoutStatusesEnum.Ids.PROCESSED)
      throw new BadRequestException(
        TenantsEnum.Exceptions.LAST_TENANT_PAYOUT_STATUS_MUST_BE_PROCESSED,
      );
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
    termsRecurringInterval: RecurringIntervalDomainEntity;
    tenantStatus: TenantStatusDomainEntity;
    totalPaidAmount: number;
    lastTenantPayoutId: string;
    lastTenantPayout: PayoutDomainEntity;
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
    | 'termsRecurringInterval'
    | 'tenantStatus'
    | 'tenantBalances'
  > & {
    //
  };

  export type Synchronize = Pick<
    TenantDomainEntity.Input,
    | 'name'
    | 'gTenantId'
    | 'agencyId'
    | 'agencyName'
    | 'termsRecurringIntervalCount'
    | 'termsRecurringInterval'
    | 'tenantStatus'
    | 'tenantBalances'
  > & {
    //
  };

  export type UpdateLastTenantPayout = Pick<
    TenantDomainEntity.Input,
    'lastTenantPayout'
  > & {
    //
  };
}
