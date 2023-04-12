import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgenciesModule } from '~/agencies/ioc/agencies.module';
import { AuthModule } from '~/auth/ioc/auth.module';
import { CountriesModule } from '~/countries/ioc/countries.module';
import { LanguagesModule } from '~/languages/ioc/languages.module';
import { ModuleRequestsModule } from '~/modules-requests/ioc/module-requests.module';
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
    TenantsModule,
    LanguagesModule,
    CountriesModule,
    TimeZonesModule,
    UserTypesModule,
    VaultsModule,
    ProcessorsModule,
    PaymentMethodsModule,
    ModuleRequestsModule,
    AgenciesModule,
    SettlementCurrenciesModule,
    RequestModule,
  ],
})
export class AppModule {}
