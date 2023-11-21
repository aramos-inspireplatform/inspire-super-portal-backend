import { FactoryProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IModuleRepository } from '~/requests/domain/repositories/module-repository.contract';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';
import { RequestProvider } from '~/requests/ioc/requests-providers.symbols';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { ModulesRepository } from '~/requests/infra/repositories/modules.repository';
import { RequestRepository } from '~/requests/infra/repositories/request.repository';
import { TenantsRepository } from '~/tenants/infra/repositories/tenants.repository';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { CreateRequestV2Command } from '~/requests/application/commands/create-request-v2.command';
import { IProcessorRepository } from '~/processors/infra/contracts/repository/processor-repository.contract';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';

export class CreateRequestCommandV2FactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProvider.Commands.CREATE_REQUEST_COMMAND_V2,
      useFactory: (
        tenantRepository: ITenantRepository,
        moduleRepository: IModuleRepository,
        requestRepository: IRequestRepository,
        processorsRepository: IProcessorRepository,
        eventEmitter: IEventEmitter,
        inspireTenantService: IInspireTenantApiService,
      ) =>
        new CreateRequestV2Command(
          tenantRepository,
          moduleRepository,
          requestRepository,
          processorsRepository,
          eventEmitter,
          inspireTenantService,
        ),
      inject: [
        TenantsRepository,
        ModulesRepository,
        RequestRepository,
        ProcessorsRepository,
        EventEmitter2,
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
      ],
    };
  }
}
