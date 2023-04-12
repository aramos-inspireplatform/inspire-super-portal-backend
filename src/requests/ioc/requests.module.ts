import { Module } from '@nestjs/common';
import { CreateRequestUseCaseFactoryProvider } from '~/requests/ioc/providers/create-request-use-case-factory.provider';
import { RequestsController } from '~/requests/presentation/requests.controller';

@Module({
  providers: [CreateRequestUseCaseFactoryProvider.register()],
  controllers: [RequestsController],
})
export class RequestModule {}
