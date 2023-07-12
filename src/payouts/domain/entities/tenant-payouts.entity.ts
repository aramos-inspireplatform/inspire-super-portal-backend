import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class TenantPayouts extends BaseDomainEntity {
  payoutAlternativeId: string;
  periodStartDate: string;
  periodEndDate: string;
  amount: string;
  termsRecurringIntervalCount: string;
  customerGrossAmount: string;
  customerFeeAmount: string;
  paymentGatewayNetAmount: string;
  expectedArrivalDate: string;
  processedDate: string;
  creatorUsers: string;
  deleterUsers: string;
  payoutStatuses: string;
  processorUsers: string;
  settlementCurrencies: string;
  tenants_id: string;
  termsRecurringIntervals: string;
  updaterUsers: string;
  tenants: string;

  constructor(attrs: InstanceProperties<TenantPayouts>) {
    super(attrs);
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
    this.payoutStatuses = attrs?.payoutStatuses;
    this.processorUsers = attrs?.processorUsers;
    this.settlementCurrencies = attrs?.settlementCurrencies;
    this.tenants_id = attrs?.tenants_id;
    this.termsRecurringIntervals = attrs?.termsRecurringIntervals;
    this.updaterUsers = attrs?.updaterUsers;
    this.tenants = attrs?.tenants;
  }
}
