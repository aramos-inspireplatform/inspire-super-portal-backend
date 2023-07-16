import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';

export interface IFindOneTenantPayoutQuery {
  execute(
    params: IFindOneTenantPayoutQuery.Input,
  ): IFindOneTenantPayoutQuery.Output;
}

export namespace IFindOneTenantPayoutQuery {
  export type Input = {
    authUser: UserAuthDto;
    payoutId: string;
  };

  export type Output = Promise<Payout>;

  // Additional types
  type Payout = {
    id: string;
    status: PayoutStatus;
    amount: number;
    settlementCurrency: SettlementCurrency;
    createdDate: Date;
    processedDate: Date;
    expectedArrivalDate: Date;
    paidDate: string;
    tenant: Tenant;
    terms: Terms;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  type SettlementCurrency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };

  type Tenant = {
    id: string;
    gTenantId: string;
    name: string;
  };

  type PayoutStatus = {
    id: string;
    name: string;
    slug: string;
  };

  type Terms = {
    recurringIntervalCount: number;
    recurringInterval: RecurringInterval;
  };

  type RecurringInterval = {
    id: string;
    name: string;
    interval: string;
  };
}
