import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { CreateAdminUserCommand } from '~/users/application/commands/create-admin-user.command';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class CreateAdminUserCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.CREATE_ADMIN_USER_COMMAND,
      useFactory: (httpClient: IHttpClient) =>
        new CreateAdminUserCommand(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
