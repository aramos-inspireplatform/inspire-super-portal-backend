import { FactoryProvider } from '@nestjs/common';
import { RequestPasswordResetUseCase } from '~/auth/application/use-case/request-password-reset.use-case';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { IEmailSender } from '~/shared/application/contracts/email-sender.contract';
import { EmailProvidersSymbols } from '~/email/ioc/providers/email-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class RequestPasswordResetUseCaseProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.REQUEST_PASSWORD_RESET_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        recoveryPasswordJwtGenerator: IJsonWebTokensGenerator,
        emailSender: IEmailSender<RequestPasswordResetUseCase.EmailResetPassword>,
      ) =>
        new RequestPasswordResetUseCase(
          userRepository,
          recoveryPasswordJwtGenerator,
          emailSender,
        ),
      inject: [
        DatabaseProvidersSymbols.USER_REPOSITORY,
        AuthProvidersSymbols.RESET_PASSWORD_JWT_GENERATOR,
        EmailProvidersSymbols.REQUEST_PASSWORD_RESET_EMAIL_SENDER,
      ],
    };
  }
}
1;
