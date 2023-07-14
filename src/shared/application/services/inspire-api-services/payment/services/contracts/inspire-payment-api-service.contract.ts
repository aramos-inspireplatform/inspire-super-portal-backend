import { FindAllPayoutPaymentsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments.dto';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';

export interface IInspirePaymentApiService {
  findAllPayoutPayments(
    attrs: FindAllPayoutPaymentsDto.InputAttrs,
  ): FindAllPayoutPaymentsDto.Result;

  findAllPayoutAdjustmentTypes(
    attrs: FindAllPayoutAdjustmentTypesDto.InputAttrs,
  ): FindAllPayoutAdjustmentTypesDto.Result;
}
