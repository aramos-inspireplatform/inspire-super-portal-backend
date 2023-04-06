import { Module } from '@nestjs/common';
import { ForgotPasswordProviderFactory } from '~/auth/ioc/providers/forgot-password-factory.provider';
import { JwtAuthStrategyProviderFactory } from '~/auth/ioc/providers/jwt-auth-strategy-factory.provider';
import { RefreshTokenProviderFactory } from '~/auth/ioc/providers/refresh-token-use-case-factory.provider';
import { SignInUseCaseProviderFactory } from '~/auth/ioc/providers/sign-in-use-case-factory.provider';
import { SignOutUseCaseFactoryProviderFactory } from '~/auth/ioc/providers/sign-out-use-case-factory.provider';
import { AuthController } from '~/auth/presentation/auth.controller';

@Module({
  providers: [
    ForgotPasswordProviderFactory.register(),
    SignInUseCaseProviderFactory.register(),
    SignOutUseCaseFactoryProviderFactory.register(),
    RefreshTokenProviderFactory.register(),
    JwtAuthStrategyProviderFactory.register(),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
