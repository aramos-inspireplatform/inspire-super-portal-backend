import { Module } from '@nestjs/common';
import { RequestCreatedEventHandler } from '~/requests/infra/events/request-created-event.handler';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { ListAllRequestsUseCaseFactoryProvider } from '~/requests/ioc/providers/list-all-requests-use-case-factory.provider';
import { ListOneRequestModuleUseCaseFactoryProvider } from '~/requests/ioc/providers/list-one-request-module-use-case-factory.provider';
import { ListOneRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/list-one-request-use-case-factory.provider';
import { RequestCreatedEventUseCaseFactoryProvider } from '~/requests/ioc/providers/request-created-event-use-case-factory.provider';
import { RequestProvisioningWebHookUseCaseFactoryProvider } from '~/requests/ioc/providers/request-provisioning-web-hook-use-case-factory.provider';
import { RequestsController } from '~/requests/presentation/requests.controller';
import { QueueModule } from '~/shared/infra/sqs/queue.module';

@Module({
  providers: [
    CreateRequestUseCaseFactoryProvider.register(),
    RequestCreatedEventUseCaseFactoryProvider.register(),
    RequestProvisioningWebHookUseCaseFactoryProvider.register(),
    ListAllRequestsUseCaseFactoryProvider.register(),
    ListOneRequestUseCaseFactoryProvider.register(),
    ListOneRequestModuleUseCaseFactoryProvider.register(),
    RequestCreatedEventHandler,
  ],
  controllers: [RequestsController],
  imports: [QueueModule],
})
export class RequestModule {}
