import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgenciesModule } from '~/agencies/ioc/agencies.module';
import { AuthModule } from '~/auth/ioc/auth.module';
import { CountriesModule } from '~/countries/ioc/countries.module';
import { LanguagesModule } from '~/languages/ioc/languages.module';
import { PaymentMethodsModule } from '~/payment-methods/ioc/payment-methods.module';
import { ProcessorsModule } from '~/processors/ioc/processors.module';
import { RequestModule } from '~/requests/ioc/requests.module';
import { SettlementCurrenciesModule } from '~/settlement-currencies/ioc/settlement-currencies.module';
import { DatabaseModule } from '~/shared/infra/database/ioc/database.module';
import { validateEnvironmentSchema } from '~/shared/infra/env/validate-environment';
import { HttpModule } from '~/shared/infra/http/ioc/http.module';
import { TenantsModule } from '~/tenants/ioc/tenants.module';
import { TimeZonesModule } from '~/time-zones/ioc/time-zones.module';
import { UserTypesModule } from '~/user-types/ioc/user-types.module';
import { UsersModule } from '~/users/ioc/users.module';
import { VaultsModule } from '~/vaults/ioc/vaults.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SqsConfig, SqsModule, SqsQueueType } from '@nestjs-packages/sqs';
import { ScheduleModule } from '@nestjs/schedule';
import { PayoutsModule } from '~/payouts/ioc/payouts.module';
import { CurrenciesModule } from '~/currencies/ioc/currencies.module';
import { InspireTenantApiServiceModule } from '~/shared/application/services/inspire-api-services/tenant/ioc/inspire-tenant-api-service.module';
import { InspirePaymentApiServiceModule } from '~/shared/application/services/inspire-api-services/payment/ioc/inspire-payment-api-service.module';
import { TransactionsModule } from '~/transactions/ioc/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [],
      validate: validateEnvironmentSchema,
    }),
    InspireTenantApiServiceModule,
    InspirePaymentApiServiceModule,
    AuthModule,
    AgenciesModule,
    TenantsModule,
    PayoutsModule,
    UsersModule,
    RequestModule,
    DatabaseModule,
    HttpModule,
    LanguagesModule,
    CountriesModule,
    TimeZonesModule,
    UserTypesModule,
    VaultsModule,
    ProcessorsModule,
    PaymentMethodsModule,
    CurrenciesModule,
    SettlementCurrenciesModule,
    TransactionsModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
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
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
