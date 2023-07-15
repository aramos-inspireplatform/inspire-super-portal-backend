import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { FindAllPayoutAdjustmentTypesDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payout-adjustment-types/find-all-payout-adjustment-types.dto';
import { FindAllPaymentsPeriodPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payments-period-paged.dto';
import { PayoutSummaryPreviewDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payouts/payout-summary-preview.dto';
import { FindAllPayoutPaymentsPagedDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/payments/find-all-payout-payments-paged.dto';

export class InspirePaymentApiService implements IInspirePaymentApiService {
  private readonly PAYMENT_API_BASE_URL = `${process.env.PAYMENT_API_URL}`;

  private readonly PAYOUT_API_BASE_URL = `${this.PAYMENT_API_BASE_URL}/payouts`;

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

  async findOnePayoutSummaryPreview(
    attrs: PayoutSummaryPreviewDto.InputAttrs,
  ): PayoutSummaryPreviewDto.Result {
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
}

// export namespace InspirePaymentApiService {
//   export type FindAllHttpResponse =
//     InspireHttpPaginatedResponse<InspirePaymentApiServiceDto.Payments>;
// }
