import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import {
  PaginationInput,
  PaginationOutput,
} from '~/shared/application/services/pagination';

export interface IFindAllTenantPayoutsPagedDao {
  execute(
    params: IFindAllTenantPayoutsPagedDao.Input,
  ): Promise<IFindAllTenantPayoutsPagedDao.Output>;
}

export namespace IFindAllTenantPayoutsPagedDao {
  export type Input = {
    userAuth: UserAuthDto;
    paginationInput: PaginationInput;
  };

  export type Output = PaginationOutput.Output<Payout>;

  // Additional types
  type Payout = {
    id: string;
    alternativeId: number;
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
    name: string;
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
