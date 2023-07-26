import { TenantBalancesEntity } from '~/payouts/domain/entities/tenant-balances.entity';
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
  //private tenantBalances: TenantBalancesEntity[] = [];

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
      //tenantBalances,
    } = input;

    // if (!paymentGateway?.isStripe())
    //   throw new BadRequestException(
    //     ReconciliationEnum.Exceptions.PAYMENT_GATEWAY_MUST_BE_STRIPE,
    //   );

    // this.validateGeneralCreateInfo({
    //   status,
    //   periodStartDate,
    //   periodEndDate,
    //   maxPeriodDateRange,
    //   creatorUser,
    // });

    this.id = id;
    this.name = name;
    this.gTenantId = gTenantId;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringIntervalId = termsRecurringIntervalId;
    this.tenantStatusId = tenantStatusId;
    this.totalPaidAmount = 0;
    //this.tenantBalances = tenantBalances;
    //this.updatedDate = new Date();
  }

  synchronize(input: TenantDomainEntity.Synchronize) {
    const {
      name,
      gTenantId,
      agencyId,
      agencyName,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      tenantStatusId,
      //tenantBalances,
    } = input;

    // if (!paymentGateway?.isStripe())
    //   throw new BadRequestException(
    //     ReconciliationEnum.Exceptions.PAYMENT_GATEWAY_MUST_BE_STRIPE,
    //   );

    // this.validateGeneralCreateInfo({
    //   status,
    //   periodStartDate,
    //   periodEndDate,
    //   maxPeriodDateRange,
    //   creatorUser,
    // });

    this.name = name;
    this.gTenantId = gTenantId;
    this.agencyId = agencyId;
    this.agencyName = agencyName;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringIntervalId = termsRecurringIntervalId;
    this.tenantStatusId = tenantStatusId;
    //this.tenantBalances = tenantBalances;
    //this.updatedDate = new Date();
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
      //tenantBalances: this.tenantBalances,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
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
    //tenantBalances:  TenantBalancesEntity[];
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
    //| 'tenantBalances'
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
    | 'termsRecurringIntervalId'
    //| 'termsRecurringInterval'
    | 'tenantStatusId'
    //| 'tenantStatus'
    //| 'tenantBalances'
  > & {
    //
  };
}
