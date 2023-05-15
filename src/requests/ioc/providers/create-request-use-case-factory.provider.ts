import { FactoryProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
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
        inspireTenantService: IInspireTenantService,
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
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
      ],
    };
  }
}
