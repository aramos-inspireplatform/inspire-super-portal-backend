import { FactoryProvider } from '@nestjs/common';
import { AuthUserGuard } from '~/auth/ioc/guards/jwt/auth-user.guard';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';

export class AuthUserGuardFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: Symbol('AuthUserGuard'),
      useFactory: (inspireTenantApiService: IInspireTenantApiService) =>
        new AuthUserGuard(inspireTenantApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE],
    };
  }
}
