import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantPayoutsPagedQuery {
  execute(
    params: IFindAllTenantPayoutsPagedQuery.Input,
  ): IFindAllTenantPayoutsPagedQuery.Output;
}

export namespace IFindAllTenantPayoutsPagedQuery {
  export type Input = {
    authUser: UserAuthDto;
    paginationInput: PaginationInput;
  };

  export type Output = QueryPaginatedOutput<Payout>;

  // Additional types
  type Payout = {
    id: string;
    alternativeId: string;
    tenant: Tenant;
    processorUser: ProcessorUser;
    status: PayoutStatus;
    amount: number;
    settlementCurrency: SettlementCurrency;
    createdDate: Date;
    processedDate: Date;
    paidDate: Date;
    expectedArrivalDate: Date;
    terms: Terms;
  };

  type ProcessorUser = {
    id: string;
    firstName: string;
    lastName: string;
  };

  type PayoutStatus = {
    id: string;
    name: string;
    slug: string;
  };

  type SettlementCurrency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };

  type Tenant = {
    id: string;
    name: string;
    gTenantId: string;
    agency: Agency;
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
}
