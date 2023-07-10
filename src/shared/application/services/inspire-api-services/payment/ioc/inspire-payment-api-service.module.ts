import { Module } from '@nestjs/common';
import { InspirePaymentApiServiceFactoryProvider } from '~/shared/application/services/inspire-api-services/payment/ioc/providers/inspire-payment-api-service-factory.provider';

@Module({
  providers: [InspirePaymentApiServiceFactoryProvider.register()],
  exports: [InspirePaymentApiServiceFactoryProvider.register()],
})
export class InspirePaymentApiServiceModule {}
