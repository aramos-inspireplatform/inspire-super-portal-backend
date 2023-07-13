import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspirePaymentApiServiceDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.dto';

export class InspirePaymentApiService implements IInspirePaymentApiService {
  private readonly PAYMENT_API_BASE_URL = `${process.env.PAYMENT_API_URL}`;

  private readonly PAYOUT_API_BASE_URL = `${this.PAYMENT_API_BASE_URL}/payouts`;

  constructor(private readonly httpClient: IHttpClient) {}

  async findPeriodPayoutPayments(
    attrs: InspirePaymentApiServiceDto.FindAllPayoutPaymentsInputAttrs,
  ): InspirePaymentApiServiceDto.FindAllPayoutPaymentsResult {
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
}

// export namespace InspirePaymentApiService {
//   export type FindAllHttpResponse =
//     InspireHttpPaginatedResponse<InspirePaymentApiServiceDto.Payments>;
// }
