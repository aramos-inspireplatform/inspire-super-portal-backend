import { FactoryProvider } from '@nestjs/common';
import { AuthSignInService } from '~/auth/application/service/sign-in.service';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';

export class SignInServiceProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.AUTH_SIGN_IN_SERVICE,
      useFactory: (
        passwordHashService: any,
        accessTokenJwtService: any,
        refreshTokenJwtService: any,
      ) =>
        new AuthSignInService(
          passwordHashService,
          accessTokenJwtService,
          refreshTokenJwtService,
        ),
      inject: [
        AuthProvidersSymbols.PASSWORD_HASH_SERVICE,
        AuthProvidersSymbols.JWT_ACCESS_TOKEN_SERVICE,
        AuthProvidersSymbols.JWT_REFRESH_TOKEN_SERVICE,
      ],
    };
  }
}
