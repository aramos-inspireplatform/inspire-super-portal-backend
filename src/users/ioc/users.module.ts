import { Module } from '@nestjs/common';
import { CreateTenantAdminUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-admin-user-use-case-factory.provider';
import { CreateTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/create-tenant-user-command-factory.provider';
import { LinkTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/link-tenant-user-command-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';
import { ListTenantUsersUseCaseFactoryProvider } from './providers/list-tenant-users-use-case-factory.provider';
import { ListAdminUsersUseCaseFactoryProvider } from './providers/list-admin-users-use-case-factory.provider';
import { ListOneUserUseCaseFactoryProvider } from '~/users/ioc/providers/list-one-use-use-case-factory.provider';

@Module({
  providers: [
    CreateTenantUserCommandFactoryProvider.register(),
    LinkTenantUserCommandFactoryProvider.register(),
    CreateTenantAdminUserUseCaseFactoryProvider.register(),
    ListTenantUsersUseCaseFactoryProvider.register(),
    ListAdminUsersUseCaseFactoryProvider.register(),
    ListOneUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
})
export class UsersModule {}
