import { FindAllPaymentsPeriodPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period-paged.dto';
import { FindAllPayoutPaymentsPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments-paged.dto';
import { FindAllPaymentsPeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period.dto';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';
import { FindAllPayoutAdjustmentsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustments/find-all-payout-adjustments.dto';
import { ManualReconciledDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/transactions/manual-reconciled.dto';
import { FindOnePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/find-one-payout.dto';
import { FindOnePayoutSummaryPreviewDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary-preview.dto';
import { FindOnePayoutSummaryDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary.dto';
import { ReconcileStripeDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-stripe.dto';
import { ReconcileBexsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-bexs.dto';
import { CreatePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/create-payout.dto';
import { ReconcilePeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-period.dto';

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

  manualReconciledCommand(
    attrs: ManualReconciledDto.InputAttrs,
  ): ManualReconciledDto.Result;

  findAllPaymentsPeriod(
    attrs: FindAllPaymentsPeriodDto.InputAttrs,
  ): FindAllPaymentsPeriodDto.Result;

  reconcileStripe(
    attrs: ReconcileStripeDto.InputAttrs,
  ): ReconcileStripeDto.Result;

  reconcileBexs(attrs: ReconcileBexsDto.InputAttrs): ReconcileBexsDto.Result;
  
  createPayoutCommand(
    attrs: CreatePayoutDto.InputAttrs,
  ): CreatePayoutDto.Result;

  findAllReconcilePeriod(
    attrs: ReconcilePeriodDto.InputAttrs,
  ): ReconcilePeriodDto.Result;
}
