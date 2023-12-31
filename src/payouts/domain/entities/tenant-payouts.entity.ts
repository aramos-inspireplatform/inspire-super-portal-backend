import { PayoutStatusesEntity } from '~/payouts/domain/entities/payout-statuses.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { Currencies } from '~/shared/infra/database/entities';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';
import { UsersEntity } from '~/users/domain/entities/users.entity';

export class TenantPayoutsEntity extends BaseDomainEntity {
  alternativeId: number;
  payoutAlternativeId: number;
  periodStartDate: Date;
  periodEndDate: Date;
  amount: number;
  termsRecurringIntervalCount: number;
  customerGrossAmount: number;
  customerFeeAmount: number;
  paymentGatewayNetAmount: number;
  expectedArrivalDate: Date;
  processedDate: Date;
  creatorUsers: UsersEntity;
  deleterUsers: UsersEntity;
  payoutStatus: PayoutStatusesEntity;
  processorUser: UsersEntity;
  settlementCurrency: Currencies;
  tenant: Tenant;
  termsRecurringInterval: RecurringInterval;
  updaterUsers: UsersEntity;
  lastPayoutTenants: Tenant[];

  constructor(attrs: InstanceProperties<TenantPayoutsEntity>) {
    super(attrs);
    this.alternativeId = attrs?.alternativeId;
    this.payoutAlternativeId = attrs?.payoutAlternativeId;
    this.periodStartDate = attrs?.periodStartDate;
    this.periodEndDate = attrs?.periodEndDate;
    this.amount = attrs?.amount;
    this.termsRecurringIntervalCount = attrs?.termsRecurringIntervalCount;
    this.customerGrossAmount = attrs?.customerGrossAmount;
    this.customerFeeAmount = attrs?.customerFeeAmount;
    this.paymentGatewayNetAmount = attrs?.paymentGatewayNetAmount;
    this.expectedArrivalDate = attrs?.expectedArrivalDate;
    this.processedDate = attrs?.processedDate;
    this.creatorUsers = attrs?.creatorUsers;
    this.deleterUsers = attrs?.deleterUsers;
    this.payoutStatus = attrs?.payoutStatus;
    this.processorUser = attrs?.processorUser;
    this.settlementCurrency = attrs?.settlementCurrency;
    this.tenant = attrs?.tenant;
    this.termsRecurringInterval = attrs?.termsRecurringInterval;
    this.updaterUsers = attrs?.updaterUsers;
    this.lastPayoutTenants = attrs?.lastPayoutTenants;
  }
}
