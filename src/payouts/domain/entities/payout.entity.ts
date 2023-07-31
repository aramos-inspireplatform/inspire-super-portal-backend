import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class PayoutDomainEntity extends BaseDomainEntity {
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
  statusId: string;
  settlementCurrencyId: string;
  termsRecurringIntervalId: string;
  processorUserId: string;
  creatorUserId: string;
  updaterUserId: string;
  tenantId: string;

  constructor(input?: Partial<PayoutDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  create(input: PayoutDomainEntity.Create) {
    const {
      id,
      createdDate,
      updatedDate,
      payoutAlternativeId,
      periodStartDate,
      periodEndDate,
      amount,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      customerFeeAmount,
      customerGrossAmount,
      paymentGatewayNetAmount,
      processedDate,
      statusId,
      settlementCurrencyId,
      processorUserId,
      creatorUserId,
      updaterUserId,
      tenantId,
    } = input;

    this.id = id;
    this.payoutAlternativeId = payoutAlternativeId;
    this.periodStartDate = periodStartDate;
    this.periodEndDate = periodEndDate;
    this.amount = amount;
    this.termsRecurringIntervalCount = termsRecurringIntervalCount;
    this.termsRecurringIntervalId = termsRecurringIntervalId;
    this.customerFeeAmount = customerFeeAmount;
    this.customerGrossAmount = customerGrossAmount;
    this.paymentGatewayNetAmount = paymentGatewayNetAmount;
    this.statusId = statusId;
    this.settlementCurrencyId = settlementCurrencyId;
    this.processorUserId = processorUserId;
    this.creatorUserId = creatorUserId;
    this.updaterUserId = updaterUserId;
    this.tenantId = tenantId;
    this.processedDate = processedDate;

    return this;
  }

  getState(): PayoutDomainEntity.State {
    return {
      id: this.id,
      payoutAlternativeId: this.payoutAlternativeId,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      processedDate: this.processedDate,
      deletedDate: this.deletedDate,
      expectedArrivalDate: this.expectedArrivalDate,
      periodStartDate: this.periodStartDate,
      periodEndDate: this.periodEndDate,
      amount: this.amount,
      termsRecurringIntervalCount: this.termsRecurringIntervalCount,
      termsRecurringIntervalId: this.termsRecurringIntervalId,
      customerGrossAmount: this.customerGrossAmount,
      customerFeeAmount: this.customerFeeAmount,
      paymentGatewayNetAmount: this.paymentGatewayNetAmount,
      statusId: this.statusId,
      settlementCurrencyId: this.settlementCurrencyId,
      processorUserId: this.processorUserId,
      creatorUserId: this.creatorUserId,
      updaterUserId: this.updaterUserId,
      tenantId: this.tenantId,
    };
  }
}

export namespace PayoutDomainEntity {
  export type Input = {
    id: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    processedDate: Date;
    expectedArrivalDate: Date;
    payoutAlternativeId: number;
    periodStartDate: Date;
    periodEndDate: Date;
    amount: number;
    termsRecurringIntervalCount: number;
    customerGrossAmount: number;
    customerFeeAmount: number;
    paymentGatewayNetAmount: number;
    statusId: string;
    settlementCurrencyId: string;
    termsRecurringIntervalId: string;
    processorUserId: string;
    creatorUserId: string;
    updaterUserId: string;
    tenantId: string;
  };

  export type State = Input & {
    //
  };

  export type Create = Omit<Input, 'deletedDate' | 'expectedArrivalDate'>;
}
