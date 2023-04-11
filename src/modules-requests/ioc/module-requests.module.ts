import { Module } from '@nestjs/common';
import { CreateModuleRequestUseCaseFactoryProvider } from '~/modules-requests/ioc/providers/create-module-request-use-case-factory.provider';
import { ModuleRequestsController } from '~/modules-requests/presentation/module-requests.controller';
import { ListModuleRequestUseCaseFactoryProvider } from './providers/list-module-request-use-case-factory.provider';

@Module({
  providers: [
    CreateModuleRequestUseCaseFactoryProvider.register(),
    ListModuleRequestUseCaseFactoryProvider.register(),
  ],
  controllers: [ModuleRequestsController],
})
export class ModuleRequestsModule {}
