import { Module } from '@nestjs/common';
import { CreateAdminUserCommandFactoryProvider } from '~/users/ioc/providers/commands/create-admin-user-command-factory.provider';
import { CreateTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/create-tenant-user-command-factory.provider';
import { LinkTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/link-tenant-user-command-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';
import { FindAllTenantUsersQueryFactoryProvider } from './providers/queries/find-all-tenant-users-query-factory.provider';
import { FindAllAdminUsersQueryFactoryProvider } from './providers/queries/find-all-admin-users-query-factory.provider';
import { FindOneAdminUserQueryFactoryProvider } from '~/users/ioc/providers/queries/find-one-admin-user-query-factory.provider';
import { FindAllTenantUsersDaoFactoryProvider } from '~/users/ioc/providers/dao/find-all-tenant-users-dao-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { FindOneAdminUserDaoFactoryProvider } from '~/users/ioc/providers/dao/find-one-admin-user-dao-factory.provider';
import { FindAllAdminUsersDaoFactoryProvider } from '~/users/ioc/providers/dao/find-all-admin-users-dao-factory.provider';

@Module({
  providers: [
    FindAllTenantUsersQueryFactoryProvider.register(),
    FindAllTenantUsersDaoFactoryProvider.register(),
    CreateTenantUserCommandFactoryProvider.register(),
    LinkTenantUserCommandFactoryProvider.register(),
    FindAllAdminUsersQueryFactoryProvider.register(),
    FindAllAdminUsersDaoFactoryProvider.register(),
    FindOneAdminUserQueryFactoryProvider.register(),
    FindOneAdminUserDaoFactoryProvider.register(),
    CreateAdminUserCommandFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
  imports: [InspireTenantApiServiceModule],
})
export class UsersModule {}
