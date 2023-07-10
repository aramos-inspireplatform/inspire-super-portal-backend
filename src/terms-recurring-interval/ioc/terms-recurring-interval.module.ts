import { Module } from '@nestjs/common';
import { GetTermsRecurringIntervalUseCaseFactoryProvider } from '~/terms-recurring-interval/ioc/providers/get-terms-recurring-interval-use-case-factory.provider';
import { ListTermsRecurringIntervalUseCaseFactoryProvider } from '~/terms-recurring-interval/ioc/providers/list-terms-recurring-interval-use-case-factory.provider';
import { TermsRecurringIntervalController } from '~/terms-recurring-interval/presentation/terms-recurring-interval.controller';

@Module({
  providers: [
    ListTermsRecurringIntervalUseCaseFactoryProvider.register(),
    GetTermsRecurringIntervalUseCaseFactoryProvider.register(),
  ],
  controllers: [TermsRecurringIntervalController],
})
export class TermsRecurringIntervalModule {}
