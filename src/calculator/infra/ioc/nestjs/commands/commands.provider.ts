import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

import { PaymentGatewayCalculatorSymbols } from '~/calculator/infra/ioc/nestjs/payment-gateway-calculator.symbols';
import { UpdatePaymentGatewayCalculatorCommandTypeOrmAdapter } from '~/calculator/infra/commands/typeorm';

export const commandsProviders: FactoryProvider[] = [
  {
    provide: PaymentGatewayCalculatorSymbols.UPDATE_PAYMENT_GATEWAY_CALCULATOR,
    useFactory: (httpClient: IHttpClient) =>
      new UpdatePaymentGatewayCalculatorCommandTypeOrmAdapter(httpClient),
    inject: [AxiosHttpClientAdapter],
  },
];
