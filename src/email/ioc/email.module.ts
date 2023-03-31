import { Module } from '@nestjs/common';
import { RequestPasswordResetFactoryProvider } from '~/email/ioc/providers/request-password-reset-provider.factory';
import { QueueModule } from '~/shared/infra/sqs/queue.module';

@Module({
  imports: [QueueModule],
  providers: [RequestPasswordResetFactoryProvider.register()],
  exports: [RequestPasswordResetFactoryProvider.register()],
})
export class EmailSenderModule {}
