import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';

export interface IFindOneTenantPayoutDao {
  execute(
    params: IFindOneTenantPayoutDao.Input,
  ): IFindOneTenantPayoutDao.Output;
}

export namespace IFindOneTenantPayoutDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    userAuth: UserAuthDto;
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
    paidDate: string;
    expectedArrivalDate: Date;
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
