import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as migrations from '~/shared/infra/database/migrations';
import * as entities from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class DataSourceFactoryProvider {
  static register() {
    return {
      provide: DatabaseProvidersSymbols.DATA_SOURCE,
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource(
          this.generateDataSourceOptions(configService),
        );
        return dataSource.initialize();
      },
      inject: [ConfigService],
    };
  }

  static generateDataSourceOptions(
    configService: ConfigService,
  ): DataSourceOptions {
    if (configService.getOrThrow('NODE_ENV') === 'test')
      return {
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST_TEST'),
        port: configService.getOrThrow<number>('DB_PORT_TEST'),
        username: configService.getOrThrow('DB_USER_TEST'),
        password: configService.getOrThrow('DB_PASS_TEST'),
        database: configService.getOrThrow('DB_NAME_TEST'),
        entities,
        migrations,
        migrationsRun: true,
        synchronize: false,
        dropSchema: true,
      };
    return {
      type: 'postgres',
      host: configService.getOrThrow('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow('DB_USER'),
      password: configService.getOrThrow('DB_PASS'),
      database: configService.getOrThrow('DB_NAME'),
      entities,
      migrations,
      synchronize: false,
      logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
    };
  }
}
