import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

import { PaymentSymbols } from '~/payments/infra/ioc/nestjs/payment.symbols';
import { UpdatePaymentGatewayCommandTypeOrmAdapter } from '~/payments/infra/commands/typeorm';

export const commandsProviders: FactoryProvider[] = [
  {
    provide: PaymentSymbols.UPDATE_PAYMENT_GATEWAY,
    useFactory: (httpClient: IHttpClient) =>
      new UpdatePaymentGatewayCommandTypeOrmAdapter(httpClient),
    inject: [AxiosHttpClientAdapter],
  },
];
