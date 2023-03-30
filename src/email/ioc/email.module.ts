import { Module } from '@nestjs/common';
import { RequestPasswordResetFactoryProvider } from '~/email/ioc/providers/request-password-reset-provider.factory';

@Module({
  providers: [RequestPasswordResetFactoryProvider.register()],
  exports: [RequestPasswordResetFactoryProvider.register()],
})
export class EmailSenderModule {}
