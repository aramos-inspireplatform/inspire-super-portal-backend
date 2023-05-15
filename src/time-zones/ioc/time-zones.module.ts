import { Module } from '@nestjs/common';
import { ListTimeZonesUseCaseFactoryProvider } from '~/time-zones/ioc/providers/list-time-zones-use-case-factory.provider';
import { TimeZonesController } from '~/time-zones/presentation/time-zones.controller';

@Module({
  providers: [ListTimeZonesUseCaseFactoryProvider.register()],
  controllers: [TimeZonesController],
})
export class TimeZonesModule {}
