import { Module } from '@nestjs/common';
import { CreateTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-user-use-case-factory.provider';
import { LinkTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/link-tenant-user-use-case-factory.provider';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';

@Module({
  providers: [
    CreateTenantUserUseCaseFactoryProvider.register(),
    LinkTenantUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController],
})
export class UsersModule {}
