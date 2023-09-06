import { Global, Module } from '@nestjs/common';
import { InspirePaymentApiServiceFactoryProvider } from '~/shared/application/services/inspire-api-services/payment/ioc/providers/inspire-payment-api-service-factory.provider';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

@Global()
@Module({
  providers: [InspirePaymentApiServiceFactoryProvider.register()],
  exports: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
})
export class InspirePaymentApiServiceModule {}
