import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IEmailSender } from '~/shared/application/contracts/email-sender.contract';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export namespace RequestPasswordResetUseCase {
  export type InputAttrs = {
    email: string;
  };

  export type EmailResetPassword = {
    token: string;
    email: string;
  };
}

export class RequestPasswordResetUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly resetPasswordJwtGenerator: IJsonWebTokensGenerator,
    private readonly emailSender: IEmailSender<RequestPasswordResetUseCase.EmailResetPassword>,
  ) {}

  async resetPassword(attrs: RequestPasswordResetUseCase.InputAttrs) {
    const user = await this.userRepository.findByEmail({ email: attrs.email });
    if (!user) return;
    user.securityToken = await this.resetPasswordJwtGenerator.sign({
      subject: user.id,
      payload: {
        email: user.email,
      },
    });
    await this.userRepository.updateUser({ user });
    await this.emailSender
      .setTemplateLanguage({
        templateLanguageIsoCode: '614ce3cfc4e9775f5a6dc60f', //user?.language?.isoCode,
      })
      .setTo({ to: { email: user.email } })
      .buildDynamicTemplateData({
        email: user.email,
        recoveryPasswordToken: user.securityToken,
      })
      .sendEmail();
  }
}
