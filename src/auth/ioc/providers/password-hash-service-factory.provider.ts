import { FactoryProvider } from '@nestjs/common';
import { PasswordHashService } from '~/auth/infra/password-hash/password-hash.service';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';

export class PasswordHashServiceFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.PASSWORD_HASH_SERVICE,
      useFactory: () => new PasswordHashService(),
    };
  }
}
