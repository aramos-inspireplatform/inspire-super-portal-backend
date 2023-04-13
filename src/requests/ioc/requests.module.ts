import { Module } from '@nestjs/common';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { RequestsController } from '~/requests/presentation/requests.controller';
import { ListRequestsUseCaseFactoryProvider } from './providers/list-requests-use-case-factory.provider';
import { RequestCreatedEventHandler } from '~/requests/infra/events/request-created-event.handler';
import { RequestCreatedEventUseCaseFactoryProvider } from '~/requests/ioc/providers/request-created-event-use-case-factory.provider';

@Module({
  providers: [
    CreateRequestUseCaseFactoryProvider.register(),
    ListRequestsUseCaseFactoryProvider.register(),
    RequestCreatedEventUseCaseFactoryProvider.register(),
    RequestCreatedEventHandler,
  ],
  controllers: [RequestsController],
})
export class RequestModule {}
