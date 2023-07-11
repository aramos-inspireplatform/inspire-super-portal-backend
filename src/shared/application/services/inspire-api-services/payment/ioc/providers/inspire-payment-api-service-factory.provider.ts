import { FactoryProvider } from '@nestjs/common';
import { InspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/inspire-payment-api.service';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class InspirePaymentApiServiceFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE,
      useFactory: (httpClient: IHttpClient) =>
        new InspirePaymentApiService(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
