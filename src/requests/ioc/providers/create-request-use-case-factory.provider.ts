import { FactoryProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { CreateRequestUseCase } from '~/requests/application/create-request.use-case';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { ModulesRepository } from '~/shared/infra/database/repositories/modules.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.CREATE_REQUEST_USE_CASE,
      useFactory: (
        tenantRepository: ITenantRepository,
        moduleRepository: IModuleRepository,
        requestRepository: IRequestRepository,
        eventEmitter: IEventEmitter,
        inspireTenantService: IInspireTenantApiService,
      ) =>
        new CreateRequestUseCase(
          tenantRepository,
          moduleRepository,
          requestRepository,
          eventEmitter,
          inspireTenantService,
        ),
      inject: [
        TenantsRepository,
        ModulesRepository,
        RequestRepository,
        EventEmitter2,
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
      ],
    };
  }
}
