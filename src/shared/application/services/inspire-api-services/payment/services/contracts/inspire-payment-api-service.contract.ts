import { FindAllPaymentsPeriodPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period-paged.dto';
import { FindAllPayoutPaymentsPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments-paged.dto';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';
import { FindAllPayoutAdjustmentsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustments/find-all-payout-adjustments.dto';
import { FindOnePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/find-one-payout.dto';
import { FindOnePayoutSummaryPreviewDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary-preview.dto';
import { FindOnePayoutSummaryDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary.dto';

export interface IInspirePaymentApiService {
  findAllPaymentsPeriodPaged(
    attrs: FindAllPaymentsPeriodPagedDto.InputAttrs,
  ): FindAllPaymentsPeriodPagedDto.Result;

  findAllPayoutPaymentsPaged(
    attrs: FindAllPayoutPaymentsPagedDto.InputAttrs,
  ): FindAllPayoutPaymentsPagedDto.Result;

  findOnePayout(attrs: FindOnePayoutDto.InputAttrs): FindOnePayoutDto.Result;

  findOnePayoutSummary(
    attrs: FindOnePayoutSummaryDto.InputAttrs,
  ): FindOnePayoutSummaryDto.Result;

  findOnePayoutSummaryPreview(
    attrs: FindOnePayoutSummaryPreviewDto.InputAttrs,
  ): FindOnePayoutSummaryPreviewDto.Result;

  findAllPayoutAdjustments(
    attrs: FindAllPayoutAdjustmentsDto.InputAttrs,
  ): FindAllPayoutAdjustmentsDto.Result;

  findAllPayoutAdjustmentTypes(
    attrs: FindAllPayoutAdjustmentTypesDto.InputAttrs,
  ): FindAllPayoutAdjustmentTypesDto.Result;
}
