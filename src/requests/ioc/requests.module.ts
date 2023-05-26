import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { InspireTenantModule } from '~/inspire-tenant/ioc/inspire-tenant.module';
import { RequestCreatedEventHandler } from '~/requests/infra/events/request-created-event.handler';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { ListAllRequestsUseCaseFactoryProvider } from '~/requests/ioc/providers/list-all-requests-use-case-factory.provider';
import { ListOneRequestModuleUseCaseFactoryProvider } from '~/requests/ioc/providers/list-one-request-module-use-case-factory.provider';
import { ListOneRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/list-one-request-use-case-factory.provider';
import { ModuleRequestBatchUseCaseFactoryProvider } from '~/requests/ioc/providers/module-request-batch-use-case-factory.provider';
import { ReAttemptRequestModuleUseCaseFactoryProvider } from '~/requests/ioc/providers/re-attempt-request-module-use-case-factory.provider';
import { RequestCreatedEventUseCaseFactoryProvider } from '~/requests/ioc/providers/request-created-event-use-case-factory.provider';
import { RequestProvisioningWebHookUseCaseFactoryProvider } from '~/requests/ioc/providers/request-provisioning-web-hook-use-case-factory.provider';
import { RequestTasksService } from '~/requests/presentation/bach-runner.cron';
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
    ReAttemptRequestModuleUseCaseFactoryProvider.register(),
    ModuleRequestBatchUseCaseFactoryProvider.register(),
    RequestCreatedEventHandler,
    RequestTasksService,
  ],
  exports: [ModuleRequestBatchUseCaseFactoryProvider.register()],
  controllers: [RequestsController],
  imports: [QueueModule, InspireTenantModule, DiscoveryModule],
})
export class RequestModule {}