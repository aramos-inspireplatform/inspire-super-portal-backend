import { FactoryProvider } from '@nestjs/common';
import { CreateModuleRequestUseCase } from '~/modules-requests/application/use-case/create-module-request.use-case';
import { IModuleRequestRepository } from '~/modules-requests/infra/contracts/repository/module-request-repository.contract';
import { IModuleRequestStatusesRepository } from '~/modules-requests/infra/contracts/repository/module-request-statuses-repository.contract';
import { IModuleRequestTypeRepository } from '~/modules-requests/infra/contracts/repository/module-request-type-repository.contract';
import { ModuleRequestsProvidersSymbols } from '~/modules-requests/ioc/module-requests-providers.symbols';
import { ModuleRequestStatusesRepository } from '~/shared/infra/database/repositories/module-request-statuses.repository';
import { ModuleRequestTypesRepository } from '~/shared/infra/database/repositories/module-request-types.repository';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateModuleRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: ModuleRequestsProvidersSymbols.CREATE_MODULE_REQUEST_USE_CASE,
      useFactory: (
        moduleRequestStatusesRepository: IModuleRequestStatusesRepository,
        moduleRequestTypeRepository: IModuleRequestTypeRepository,
        tenantRepository: ITenantRepository,
        moduleRequestRepository: IModuleRequestRepository,
      ) =>
        new CreateModuleRequestUseCase(
          moduleRequestStatusesRepository,
          moduleRequestTypeRepository,
          tenantRepository,
          moduleRequestRepository,
        ),
      inject: [
        ModuleRequestStatusesRepository,
        ModuleRequestTypesRepository,
        TenantsRepository,
        ModuleRequestRepository,
      ],
    };
  }
}
