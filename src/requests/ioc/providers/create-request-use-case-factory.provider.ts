import { FactoryProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { CreateRequestUseCase } from '~/requests/application/create-request.use-case';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { ModulesRepository } from '~/shared/infra/database/repositories/modules.repository';
import { RequestModuleStatusRepository } from '~/shared/infra/database/repositories/request-modules-status.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';

import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.CREATE_REQUEST_USE_CASE,
      useFactory: (
        tenantRepository: ITenantRepository,
        requestStatusRepository: IRequestStatusesRepository,
        moduleRepository: IModuleRepository,
        requestModulesStautusRepository: IRequestModuleStatusRepository,
        requestRepository: IRequestRepository,
        eventEmitter: IEventEmitter,
        inspireTenantService: IInspireTenantService,
      ) =>
        new CreateRequestUseCase(
          tenantRepository,
          requestStatusRepository,
          moduleRepository,
          requestModulesStautusRepository,
          requestRepository,
          eventEmitter,
          inspireTenantService,
        ),
      inject: [
        TenantsRepository,
        RequestStatusesRepository,
        ModulesRepository,
        RequestModuleStatusRepository,
        RequestRepository,
        EventEmitter2,
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
      ],
    };
  }
}
