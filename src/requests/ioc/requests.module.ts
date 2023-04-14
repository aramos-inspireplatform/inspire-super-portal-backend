import { Module } from '@nestjs/common';
import { RequestCreatedEventHandler } from '~/requests/infra/events/request-created-event.handler';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { RequestCreatedEventUseCaseFactoryProvider } from '~/requests/ioc/providers/request-created-event-use-case-factory.provider';
import { RequestProvisioningWebHookUseCaseFactoryProvider } from '~/requests/ioc/providers/request-provisioning-web-hook-use-case-factory.provider';
import { RequestsController } from '~/requests/presentation/requests.controller';

@Module({
  providers: [
    CreateRequestUseCaseFactoryProvider.register(),
    RequestCreatedEventUseCaseFactoryProvider.register(),
    RequestProvisioningWebHookUseCaseFactoryProvider.register(),
    RequestCreatedEventHandler,
  ],
  controllers: [RequestsController],
})
export class RequestModule {}
