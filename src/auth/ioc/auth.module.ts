import { Module } from '@nestjs/common';
import { AccessTokenJwtServiceProviderFactory } from '~/auth/ioc/providers/access-token-jwt-service-factory.provider';
import { JwtAuthStrategyProviderFactory } from '~/auth/ioc/providers/jwt-auth-strategy-factory.provider';
import { PasswordHashServiceFactoryProvider } from '~/auth/ioc/providers/password-hash-service-factory.provider';
import { RefreshTokenJwtServiceProviderFactory } from '~/auth/ioc/providers/refresh-token-jwt-service-factory.provider';
import { RequestPasswordResetUseCaseProviderFactory } from '~/auth/ioc/providers/request-password-reset-use-case-factory.provider';
import { RequestResetPasswordJwtGeneratorProviderFactory } from '~/auth/ioc/providers/request-reset-password-jwt-generator-factory.provider';
import { ResetPasswordProviderFactory } from '~/auth/ioc/providers/reset-password-factory.provider';
import { SignInUseCaseProviderFactory } from '~/auth/ioc/providers/sign-in-use-case-factory.provider';
import { SignOutUseCaseFactoryProviderFactory } from '~/auth/ioc/providers/sign-out-use-case-factory.provider';
import { AuthController } from '~/auth/presentation/auth.controller';
import { EmailSenderModule } from '~/email/ioc/email.module';

@Module({
  imports: [EmailSenderModule],
  providers: [
    AccessTokenJwtServiceProviderFactory.register(),
    RefreshTokenJwtServiceProviderFactory.register(),
    PasswordHashServiceFactoryProvider.register(),
    SignInUseCaseProviderFactory.register(),
    RequestPasswordResetUseCaseProviderFactory.register(),
    RequestResetPasswordJwtGeneratorProviderFactory.register(),
    ResetPasswordProviderFactory.register(),
    JwtAuthStrategyProviderFactory.register(),
    SignOutUseCaseFactoryProviderFactory.register(),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
