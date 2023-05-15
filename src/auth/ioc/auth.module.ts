import { Module } from '@nestjs/common';
import { ForgotPasswordFactoryProvider } from '~/auth/ioc/providers/forgot-password-factory.provider';
import { JwtAuthStrategyFactoryProvider } from '~/auth/ioc/providers/jwt-auth-strategy-factory.provider';
import { RefreshTokenFactoryProvider } from '~/auth/ioc/providers/refresh-token-use-case-factory.provider';
import { SignInUseCaseFactoryProvider } from '~/auth/ioc/providers/sign-in-use-case-factory.provider';
import { SignOutUseCaseFactoryFactoryProvider } from '~/auth/ioc/providers/sign-out-use-case-factory.provider';
import { AuthController } from '~/auth/presentation/auth.controller';

@Module({
  providers: [
    ForgotPasswordFactoryProvider.register(),
    SignInUseCaseFactoryProvider.register(),
    SignOutUseCaseFactoryFactoryProvider.register(),
    RefreshTokenFactoryProvider.register(),
    JwtAuthStrategyFactoryProvider.register(),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
