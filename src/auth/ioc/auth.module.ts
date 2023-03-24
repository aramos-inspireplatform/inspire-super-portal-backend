import { Module } from '@nestjs/common';
import { AccessTokenJwtServiceProviderFactory } from '~/auth/ioc/providers/access-token-jwt-service-factory.provider';
import { PasswordHashServiceFactoryProvider } from '~/auth/ioc/providers/password-hash-service-factory.provider';
import { RefreshTokenJwtServiceProviderFactory } from '~/auth/ioc/providers/refresh-token-jwt-service-factory.provider';
import { SignInServiceProviderFactory } from '~/auth/ioc/providers/sign-in-service-factory.provider';
import { SignInUseCaseProviderFactory } from '~/auth/ioc/providers/sign-in-use-case-factory.provider';

@Module({
  providers: [
    AccessTokenJwtServiceProviderFactory.register(),
    RefreshTokenJwtServiceProviderFactory.register(),
    PasswordHashServiceFactoryProvider.register(),
    SignInServiceProviderFactory.register(),
    SignInUseCaseProviderFactory.register(),
  ],
})
export class AuthModule {}
