import { Module } from '@nestjs/common';
import { CreateTenantAdminUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-admin-user-use-case-factory.provider';
import { CreateTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-user-use-case-factory.provider';
import { LinkTenantUserUseCaseFactoryProvider } from '~/users/ioc/providers/link-tenant-user-use-case-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';

@Module({
  providers: [
    CreateTenantUserUseCaseFactoryProvider.register(),
    LinkTenantUserUseCaseFactoryProvider.register(),
    CreateTenantAdminUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
})
export class UsersModule {}
