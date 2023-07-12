import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class TenantPayoutsEntity extends BaseDomainEntity {
  payoutAlternativeId: string;
  periodStartDate: string;
  periodEndDate: string;
  amount: string;
  termsRecurringIntervalCount: number;
  customerGrossAmount: string;
  customerFeeAmount: string;
  paymentGatewayNetAmount: string;
  expectedArrivalDate: string;
  processedDate: Date;
  creatorUsers: any; //Id
  deleterUsers: any; //Id
  payoutStatuses: any; //Id
  processorUsers: any; //Id
  settlementCurrencies: any; //Id
  tenantsId: any; //Id
  termsRecurringIntervals: any; //Id
  updaterUsers: any; //Id
  tenants: any; //Id

  constructor(attrs: InstanceProperties<TenantPayoutsEntity>) {
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
    this.tenantsId = attrs?.tenantsId;
    this.termsRecurringIntervals = attrs?.termsRecurringIntervals;
    this.updaterUsers = attrs?.updaterUsers;
    this.tenants = attrs?.tenants;
  }
}
