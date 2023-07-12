import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import {
  PaginationInput,
  PaginationOutput,
} from '~/shared/application/services/pagination';

export interface IFindAllTenantPayoutsDao {
  execute(
    params: IFindAllTenantPayoutsDao.Input,
  ): Promise<IFindAllTenantPayoutsDao.Output>;
}

export namespace IFindAllTenantPayoutsDao {
  export type Input = {
    pagination: PaginationInput;
  };

  export type Output = PaginationOutput.Output<TenantPayoutsEntity>;

  // Additional types
  export type TenantPayout = {
    // id: string;
    // date: Date;
    // status: string;
    // amount: number;
    // receivedAmount: number;
    // feeAmount: number;
    // payableAmount: number;
    // profitAmount: number;
    // paymentProcessorName: string;
    // paymentMethodName: string;
    // creditCardBrandName: string;
    // installments: number;
    // paymentProcessorId: string;
    // reconciliationMethod: string;
    // paymentProcessorConfirmation: string;
  };
}
