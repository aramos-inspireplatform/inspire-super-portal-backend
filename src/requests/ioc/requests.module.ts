import { Module } from '@nestjs/common';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { RequestsController } from '~/requests/presentation/requests.controller';
import { ListRequestsUseCaseFactoryProvider } from './providers/list-requests-use-case-factory.provider';

@Module({
  providers: [
    CreateRequestUseCaseFactoryProvider.register(),
    ListRequestsUseCaseFactoryProvider.register(),
  ],
  controllers: [RequestsController],
})
export class RequestModule {}
