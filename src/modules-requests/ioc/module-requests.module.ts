import { Module } from '@nestjs/common';
import { CreateModuleRequestUseCaseFactoryProvider } from '~/modules-requests/ioc/providers/create-module-request-use-case-factory.provider';
import { ModuleRequestsController } from '~/modules-requests/presentation/module-requests.controller';

@Module({
  providers: [CreateModuleRequestUseCaseFactoryProvider.register()],
  controllers: [ModuleRequestsController],
})
export class ModuleRequestsModule {}
