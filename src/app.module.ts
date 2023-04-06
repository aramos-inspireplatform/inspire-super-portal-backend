import { SqsConfig, SqsModule, SqsQueueType } from '@nestjs-packages/sqs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '~/auth/ioc/auth.module';
import { DatabaseModule } from '~/shared/infra/database/ioc/database.module';
import { validateEnvironmentSchema } from '~/shared/infra/env/validate-environment';
import { HttpModule } from '~/shared/infra/http/ioc/http.module';
import { QueueModule } from '~/shared/infra/sqs/queue.module';
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
    HttpModule,
    // TODO: START SQS need some code review at this point
    SqsModule.forRootAsync({
      useFactory: () => {
        return new SqsConfig({
          region: process.env.AWS_SQS_REGION,
          endpoint: process.env.AWS_SQS_ENDPOINT,
          accountNumber: process.env.AWS_SQS_ACCOUNT_NUMBER,
          credentials: {
            accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY,
          },
        });
      },
    }),
    SqsModule.registerQueue({
      name: process.env.AWS_SQS_EMAIL_QUEUE,
      type: SqsQueueType.Producer,
    }),
    QueueModule,
    // TODO: END SQS
  ],
})
export class AppModule {}
