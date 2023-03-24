import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '~/auth/ioc/auth.module';
import { DatabaseModule } from '~/shared/infra/database/ioc/database.module';
import { validateEnvironmentSchema } from '~/shared/infra/env/validate-environment';
import { UsersModule } from '~/users/ioc/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [],
      validate: validateEnvironmentSchema,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
