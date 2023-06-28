import { Module } from '@nestjs/common';
import { CreateTenantAdminUserUseCaseFactoryProvider } from '~/users/ioc/providers/create-tenant-admin-user-use-case-factory.provider';
import { CreateTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/create-tenant-user-command-factory.provider';
import { LinkTenantUserCommandFactoryProvider } from '~/users/ioc/providers/commands/link-tenant-user-command-factory.provider';
import { TenantAdminUsersController } from '~/users/presentation/tenant-admin-user.controller';
import { TenantsUsersController } from '~/users/presentation/tenant-users.controller';
import { FindAllTenantUsersQueryFactoryProvider } from './providers/queries/find-all-tenant-users-query-factory.provider';
import { ListAdminUsersUseCaseFactoryProvider } from './providers/list-admin-users-use-case-factory.provider';
import { ListOneUserUseCaseFactoryProvider } from '~/users/ioc/providers/list-one-use-use-case-factory.provider';
import { FindAllTenantUsersDaoFactoryProvider } from '~/users/ioc/providers/dao/find-all-tenant-users-dao-factory.provider';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';

@Module({
  providers: [
    FindAllTenantUsersQueryFactoryProvider.register(),
    FindAllTenantUsersDaoFactoryProvider.register(),
    CreateTenantUserCommandFactoryProvider.register(),
    LinkTenantUserCommandFactoryProvider.register(),
    CreateTenantAdminUserUseCaseFactoryProvider.register(),
    ListAdminUsersUseCaseFactoryProvider.register(),
    ListOneUserUseCaseFactoryProvider.register(),
  ],
  controllers: [TenantsUsersController, TenantAdminUsersController],
  imports: [InspireTenantApiServiceModule],
})
export class UsersModule {}
