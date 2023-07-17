import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    @Inject(InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE)
    private readonly inspireTenantApiService: IInspireTenantApiService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearer = request?.headers?.authorization;
    const userAuth = new UserAuthDto(request?.user, []);

    if (userAuth.isAgencyAdmin()) {
      const agencyAdminUser =
        await this.inspireTenantApiService.findOneAdminUser({
          accessToken: bearer,
          userObjectId: userAuth.userObjectId,
        });

      userAuth.updateAgencies(agencyAdminUser?.agencies);
    }

    request.user.authUser = userAuth;

    return true;
  }
}
