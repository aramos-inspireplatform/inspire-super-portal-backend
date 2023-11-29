import { FindAllPaymentsPeriodPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period-paged.dto';
import { FindAllPayoutPaymentsPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments-paged.dto';
import { FindAllPaymentsPeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period.dto';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';
import { FindAllPayoutAdjustmentsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustments/find-all-payout-adjustments.dto';
import { ManualReconciledDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/transactions/manual-reconciled.dto';
import { FindOnePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/find-one-payout.dto';
import { FindOnePayoutSummaryPreviewDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary-preview.dto';
import { FindOnePayoutSummaryDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary.dto';
import { ReconciliateStripeDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-stripe.dto';
import { ReconciliateBexsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-bexs.dto';
import { CreatePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/create-payout.dto';
import { ReconcilePeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-period.dto';
import { UpdateTenantConfigurationsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/product-prices/update-product-prices.dto';

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

  reconciliateStripe(
    attrs: ReconciliateStripeDto.InputAttrs,
  ): ReconciliateStripeDto.Result;

  reconciliateBexs(
    attrs: ReconciliateBexsDto.InputAttrs,
  ): ReconciliateBexsDto.Result;

  createPayoutCommand(
    attrs: CreatePayoutDto.InputAttrs,
  ): CreatePayoutDto.Result;

  findAllReconcilePeriod(
    attrs: ReconcilePeriodDto.InputAttrs,
  ): ReconcilePeriodDto.Result;

  updateTenantConfiguration(
    attrs: UpdateTenantConfigurationsDto.InputAttrs,
  ): UpdateTenantConfigurationsDto.Result;
}
