import { FactoryProvider } from '@nestjs/common';
import { JwtAuthStrategy } from '~/auth/ioc/guards/jwt/auth.strategy';

export class JwtAuthStrategyProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: Symbol('JwtAuthStrategy'),
      useFactory: () => new JwtAuthStrategy(),
    };
  }
}
