import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { GetTermsRecurringIntervalUseCase } from '~/terms-recurring-interval/application/use-case/get-terms-recurring-interval.use-case';
import { TermsRecurringIntervalProvidersSymbols } from '~/terms-recurring-interval/ioc/terms-recurring-interval.symbols';

export class GetTermsRecurringIntervalUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide:
        TermsRecurringIntervalProvidersSymbols.GET_RECURRING_INTERVAL_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new GetTermsRecurringIntervalUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
