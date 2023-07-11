import { InspirePaymentApiServiceDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.dto';

export interface IInspirePaymentApiService {
  findAllPayoutPayments(
    attrs: InspirePaymentApiServiceDto.FindAllPayoutPaymentsInputAttrs,
  ): InspirePaymentApiServiceDto.FindAllPayoutPaymentsResult;
}
