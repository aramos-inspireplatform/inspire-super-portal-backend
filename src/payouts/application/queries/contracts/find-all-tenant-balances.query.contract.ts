import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantBalancesQuery {
  execute(
    params: IFindAllTenantBalancesQuery.Input,
  ): IFindAllTenantBalancesQuery.Output;
}

export namespace IFindAllTenantBalancesQuery {
  export type Input = {
    authUser: UserAuthDto;
    paginationInput: PaginationInput;
  };

  export type Output = QueryPaginatedOutput<TenantBalance>;

  // Additional types
  type TenantBalance = {
    id: string;
    name: string;
    gTenantId: string;
    agency: Agency;
    terms: Terms;
    status: Status;
    lastPayout: LastPayout;
    totalPaidAmount: number;
    balances: Balance[];
  };

  type Agency = {
    id: string;
    name: string;
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

  type Status = {
    id: string;
    name: string;
    slug: string;
  };

  type LastPayout = {
    id: string;
    status: PayoutStatus;
    amount: number;
    settlementCurrency: Currency;
    periodStartDate: Date;
    periodEndDate: Date;
    processedDate: Date;
  };

  type PayoutStatus = {
    id: string;
    name: string;
    slug: string;
  };

  type Currency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };

  type Balance = {
    id: string;
    amount: number;
    settlementCurrency: Currency;
  };
}
