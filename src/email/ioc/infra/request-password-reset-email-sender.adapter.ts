import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { RequestPasswordResetUseCase } from '~/auth/application/use-case/request-password-reset.use-case';
import { IEmailSender } from '~/shared/application/contracts/email-sender.contract';
import { QueueService } from '~/shared/infra/sqs/queue.service';

export class RequestPasswordResetEmailSender extends IEmailSender<RequestPasswordResetUseCase.EmailResetPassword> {
  constructor(
    private readonly configService: ConfigService,
    private readonly queueService: QueueService,
  ) {
    super({
      subject: 'Password Reset',
      templateName: 'forgot-password',
    });
  }

  buildDynamicTemplateData(payload: {
    email: string;
    token: string;
  }): IEmailSender<RequestPasswordResetUseCase.EmailResetPassword> {
    this.emailMetadata.dynamicTemplateData = {
      email: payload.email,
      token: payload.token,
    };
    return this;
  }

  async sendEmail(): Promise<void> {
    const queueName = this.configService.get<string>('AWS_SQS_EMAIL_QUEUE');
    await this.queueService.sendMessage({
      queueName,
      body: {
        id: randomUUID(),
        body: {
          ...this.emailMetadata,
          tenant: 'teste-hnmkt', // TODO email nao precisa do tenant, precisa revisar esta parte, estamos com uma proposta de envio de email diferente, esperando aprovacao
        },
      },
    });
  }
}
