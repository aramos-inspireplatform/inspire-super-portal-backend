import { Module } from '@nestjs/common';
import { UsersServiceProviderFactory } from '~/users/ioc/providers/users-service-factory.provider';

@Module({
  providers: [UsersServiceProviderFactory.register()],
  exports: [UsersServiceProviderFactory.register()],
})
export class UsersModule {}
