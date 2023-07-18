import { FactoryProvider } from '@nestjs/common';
import { UserAuthGuard } from '~/auth/ioc/guards/jwt/user-auth.guard';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';

export class UserAuthGuardFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: Symbol('UserAuthGuard'),
      useFactory: (inspireTenantApiService: IInspireTenantApiService) =>
        new UserAuthGuard(inspireTenantApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE],
    };
  }
}
