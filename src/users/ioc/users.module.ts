import { Module } from '@nestjs/common';
import { CreateTenantAdminUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-admin-user-use-case-factory.provider';
import { CreateTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/create-tenant-user-command-factory.provider';
import { LinkTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/link-tenant-user-command-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';
import { FindAllTenantUsersQueryFactoryProvider } from './providers/queries/find-all-tenant-users-query-factory.provider';
import { FindAllAdminUsersQueryFactoryProvider } from './providers/queries/find-all-admin-users-query-factory.provider';
import { FindOneUserQueryFactoryProvider } from '~/users/ioc/providers/queries/find-one-user-query-factory.provider';
import { FindAllTenantUsersDaoFactoryProvider } from '~/users/ioc/providers/dao/find-all-tenant-users-dao-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { FindOneUserDaoFactoryProvider } from '~/users/ioc/providers/dao/find-one-user-dao-factory.provider';
import { FindAllAdminUsersDaoFactoryProvider } from '~/users/ioc/providers/dao/find-all-admin-users-dao-factory.provider';

@Module({
  providers: [
    FindAllTenantUsersQueryFactoryProvider.register(),
    FindAllTenantUsersDaoFactoryProvider.register(),
    FindAllAdminUsersQueryFactoryProvider.register(),
    FindAllAdminUsersDaoFactoryProvider.register(),
    FindOneUserQueryFactoryProvider.register(),
    FindOneUserDaoFactoryProvider.register(),
    CreateTenantUserCommandFactoryProvider.register(),
    LinkTenantUserCommandFactoryProvider.register(),
    CreateTenantAdminUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
  imports: [InspireTenantApiServiceModule],
})
export class UsersModule {}
