import { SqsService } from '@nestjs-packages/sqs';
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestPasswordResetEmailSender } from '~/email/ioc/infra/request-password-reset-email-sender.adapter';
import { EmailProvidersSymbols } from '~/email/ioc/providers/email-providers.symbols';

export class RequestPasswordResetFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: EmailProvidersSymbols.REQUEST_PASSWORD_RESET_EMAIL_SENDER,
      useFactory: (configService: ConfigService, sqsService: SqsService) =>
        new RequestPasswordResetEmailSender(configService, sqsService),
      inject: [ConfigService, SqsService],
    };
  }
}
