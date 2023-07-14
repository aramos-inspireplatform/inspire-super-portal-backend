import { InspirePaymentApiServiceDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.dto';

export interface IInspirePaymentApiService {
  findPeriodPayoutPayments(
    attrs: InspirePaymentApiServiceDto.FindPeriodPayoutPaymentsInputAttrs,
  ): InspirePaymentApiServiceDto.FindPeriodPayoutPaymentsResult;

  searchAllPayoutPayments(
    attrs: InspirePaymentApiServiceDto.SearchAllPayoutPaymentsInputAttrs,
  ): Promise<InspirePaymentApiServiceDto.Payment[]>;
}
