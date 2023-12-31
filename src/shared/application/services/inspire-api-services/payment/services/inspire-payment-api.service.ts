import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';
import { FindAllPaymentsPeriodPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period-paged.dto';
import { FindOnePayoutSummaryPreviewDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary-preview.dto';
import { FindAllPayoutPaymentsPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments-paged.dto';
import { FindAllPayoutAdjustmentsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustments/find-all-payout-adjustments.dto';
import { ManualReconciledDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/transactions/manual-reconciled.dto';
import { FindOnePayoutSummaryDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary.dto';
import { FindOnePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/find-one-payout.dto';
import { FindAllPaymentsPeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period.dto';
import { ReconciliateStripeDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-stripe.dto';
import { ReconciliateBexsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-bexs.dto';
import { CreatePayoutDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/create-payout.dto';
import { ReconcilePeriodDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/reconciliations/reconcile-period.dto';
import { UpdateTenantConfigurationsDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/product-prices/update-product-prices.dto';

export class InspirePaymentApiService implements IInspirePaymentApiService {
  private readonly PAYMENT_API_BASE_URL = `${process.env.PAYMENT_API_URL}`;

  private readonly PAYOUT_API_BASE_URL = `${this.PAYMENT_API_BASE_URL}/payouts`;

  private readonly TRANSACTION_API_BASE_URL = `${this.PAYMENT_API_BASE_URL}/transactions`;

  private readonly TENANT_API_BASE_URL = `${this.PAYMENT_API_BASE_URL}/tenants`;

  constructor(private readonly httpClient: IHttpClient) {}

  async findAllPaymentsPeriodPaged(
    attrs: FindAllPaymentsPeriodPagedDto.InputAttrs,
  ): FindAllPaymentsPeriodPagedDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/payments/period`;

    const payments = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
      params: {
        periodStartDate: attrs.periodStartDate,
        periodEndDate: attrs.periodEndDate,
        settlementCurrencyIsoCode: attrs.settlementCurrencyIsoCode,
        payoutId: attrs.payoutId,
        ...attrs.pagination,
      },
    });

    return payments.data.body.data;
  }

  async findAllPaymentsPeriod(
    attrs: FindAllPaymentsPeriodDto.InputAttrs,
  ): FindAllPaymentsPeriodDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/payments/period/select-all`;

    const payments = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
      params: {
        periodStartDate: attrs.periodStartDate,
        periodEndDate: attrs.periodEndDate,
        settlementCurrencyIsoCode: attrs.settlementCurrencyIsoCode,
        payoutId: attrs.payoutId,
      },
    });

    return payments.data.body.data;
  }

  async findAllPayoutPaymentsPaged(
    attrs: FindAllPayoutPaymentsPagedDto.InputAttrs,
  ): FindAllPayoutPaymentsPagedDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/${attrs.payoutId}/payments`;

    const payments = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
      params: {
        ...attrs.pagination,
      },
    });

    return payments.data.body.data;
  }

  async findOnePayout(
    attrs: FindOnePayoutDto.InputAttrs,
  ): FindOnePayoutDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/${attrs.payoutId}`;

    const payout = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
    });

    return payout.data.body.data;
  }

  async findOnePayoutSummary(
    attrs: FindOnePayoutSummaryDto.InputAttrs,
  ): FindOnePayoutSummaryDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/${attrs.payoutId}/summary`;

    const payoutSummary = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
    });

    return payoutSummary.data.body.data;
  }

  async findOnePayoutSummaryPreview(
    attrs: FindOnePayoutSummaryPreviewDto.InputAttrs,
  ): FindOnePayoutSummaryPreviewDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/summary/preview`;

    const payoutSummaryPreview = await this.httpClient.post<any>(
      url,
      {
        payments: attrs.payments,
        adjustmentFees: attrs.adjustmentFees,
        payoutId: attrs.payoutId,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.gTenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
        },
      },
    );

    return payoutSummaryPreview.data.body.data;
  }

  async findAllPayoutAdjustments(
    attrs: FindAllPayoutAdjustmentsDto.InputAttrs,
  ): FindAllPayoutAdjustmentsDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/${attrs.payoutId}/adjustments`;

    const payoutAdjustments = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
    });

    return payoutAdjustments.data.body.data;
  }

  async findAllPayoutAdjustmentTypes(
    attrs: FindAllPayoutAdjustmentTypesDto.InputAttrs,
  ): FindAllPayoutAdjustmentTypesDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/adjustment-types`;

    const adjustmentTypes = await this.httpClient.get<any>(url, {
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
    });

    return adjustmentTypes.data.body.data;
  }

  async manualReconciledCommand(
    attrs: ManualReconciledDto.InputAttrs,
  ): ManualReconciledDto.Result {
    const { transactionId, status } = attrs;
    const url = `${this.TRANSACTION_API_BASE_URL}/${transactionId}/manual-reconciled/${status}`;

    const result = await this.httpClient.post<any>(
      url,
      {},
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.gTenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
        },
      },
    );
    return result.data;
  }

  async reconciliateStripe(
    attrs: ReconciliateStripeDto.InputAttrs,
  ): ReconciliateStripeDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/reconciliations/stripe`;

    const reconcileStripe = await this.httpClient.post<any>(
      url,
      {
        periodStartDate: attrs.periodStartDate,
        periodEndDate: attrs.periodEndDate,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.gTenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
        },
      },
    );

    return reconcileStripe.data.body.data;
  }

  async createPayoutCommand(
    attrs: CreatePayoutDto.InputAttrs,
  ): CreatePayoutDto.Result {
    const {
      payoutId,
      adjustmentFees,
      selectedPayments,
      accessToken,
      gTenantId,
      command,
      periodStartDate,
      periodEndDate,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      selectAllPayments,
      settlementCurrencyIsoCode,
    } = attrs;

    let url = `${this.PAYOUT_API_BASE_URL}`;
    if (payoutId) url += `/${payoutId}`;

    const result = await this.httpClient.put<any>(
      url,
      {
        adjustmentFees,
        selectedPayments,
        accessToken,
        gTenantId,
        command,
        periodStartDate,
        periodEndDate,
        termsRecurringIntervalCount,
        termsRecurringIntervalId,
        selectAllPayments,
        settlementCurrencyIsoCode,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.gTenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
        },
      },
    );
    return result.data.body.data;
  }

  async findAllReconcilePeriod(
    attrs: ReconcilePeriodDto.InputAttrs,
  ): ReconcilePeriodDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/reconciliations`;

    const reconcile = await this.httpClient.get<any>(url, {
      params: {
        periodStartDate: attrs.periodStartDate,
        periodEndDate: attrs.periodEndDate,
        status: attrs.status,
      },
      headers: {
        authorization: attrs.accessToken,
        tenant: attrs.gTenantId,
        'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
      },
    });

    return reconcile.data.body.data;
  }
  async reconciliateBexs(
    attrs: ReconciliateBexsDto.InputAttrs,
  ): ReconciliateBexsDto.Result {
    const url = `${this.PAYOUT_API_BASE_URL}/reconciliations/bexs`;

    const reconcileBexs = await this.httpClient.post<any>(
      url,
      {
        file: attrs.buffer,
      },
      {
        params: {
          periodStartDate: attrs.periodStartDate,
          periodEndDate: attrs.periodEndDate,
        },
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.gTenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          'content-type': 'multipart/form-data',
        },
      },
    );

    return reconcileBexs.data.body.data;
  }

  async updateTenantConfiguration(
    attrs: UpdateTenantConfigurationsDto.InputAttrs,
  ): UpdateTenantConfigurationsDto.Result {
    const response = await this.httpClient.patch<any>(
      `${this.TENANT_API_BASE_URL}/update-tenants-configurations`,
      {
        isDualPricingActive: attrs.isDualPricingActive,
        dualPricingPercentage: attrs.dualPricingPercentage,
      },
      {
        headers: {
          authorization: attrs.accessToken,
          tenant: attrs.tenant,
        },
      },
    );

    return response.data.body.data;
  }
}
