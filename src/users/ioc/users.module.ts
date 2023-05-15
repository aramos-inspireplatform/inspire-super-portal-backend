import { Module } from '@nestjs/common';
import { CreateTenantAdminUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-admin-user-use-case-factory.provider';
import { CreateTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-user-use-case-factory.provider';
import { LinkTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/link-tenant-user-use-case-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';
import { ListTenantUsersUseCaseFactoryProvider } from './providers/list-tenant-users-use-case-factory.provider';
import { ListAdminUsersUseCaseFactoryProvider } from './providers/list-admin-users-use-case-factory.provider';
import { ListOneUserUseCaseFactoryProvider } from '~/users/ioc/providers/list-one-use-use-case-factory.provider';

@Module({
  providers: [
    CreateTenantUserUseCaseFactoryProvider.register(),
    LinkTenantUserUseCaseFactoryProvider.register(),
    CreateTenantAdminUserUseCaseFactoryProvider.register(),
    ListTenantUsersUseCaseFactoryProvider.register(),
    ListAdminUsersUseCaseFactoryProvider.register(),
    ListOneUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
})
export class UsersModule {}
