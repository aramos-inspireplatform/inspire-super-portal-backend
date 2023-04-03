import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordJwtGenerator } from '~/auth/infra/json-web-tokens/reset-password-jwt-generator';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';

export class RequestResetPasswordJwtGeneratorProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.RESET_PASSWORD_JWT_GENERATOR,
      useFactory: (configService: ConfigService) =>
        new ResetPasswordJwtGenerator(
          configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
          configService.get<string>('JWT_RESET_PASSWORD_EXPIRES_IN'),
          configService.get<string>('JWT_RESET_PASSWORD_ISSUER'),
        ),
      inject: [ConfigService],
    };
  }
}
