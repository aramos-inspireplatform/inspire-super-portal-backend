import { FactoryProvider } from '@nestjs/common';
import { PaymentProcessorRepositoryFactoryProvider } from '~/requests/ioc/providers/repositories/payment-processor-repository-factory.provider';

export const repositoriesProviders: FactoryProvider[] = [
  PaymentProcessorRepositoryFactoryProvider.register(),
];
