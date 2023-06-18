import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { Request } from '~/requests/domain/entities/request.entity';
import { RequestModuleNotFoundException } from '~/requests/domain/exceptions/request-module-not-found.exception';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { RequestEvents } from '~/shared/domain/events/request.events';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { TenantNotFoundException } from '~/tenants/domain/exceptions/tenant-not-found.exception';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCase {
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly moduleRepository: IModuleRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly eventEmitter: IEventEmitter,
    private readonly inspireTenantService: IInspireTenantApiService,
  ) {}

  async handle(attrs: CreateRequestUseCase.InputAttrs) {
    const userRequesterData =
      await this.inspireTenantService.getTenantJwtTokenUserDetails(attrs);
    const tenant = await this.getTenant(attrs);
    const request = new Request({
      createdByUserEmail: userRequesterData.email,
      createdByUserId: userRequesterData.id,
      tenant,
    });
    for await (const module of attrs.modules) {
      const storedModule = await this.getModule(module);
      if (!storedModule) continue;
      request.addRequestModule({
        module: {
          id: storedModule.id,
          ...module,
        },
        requestSettings: module.requestSettings,
        ...attrs,
      });
    }
    const storedRequest = await this.requestRepository.create(request);
    this.eventEmitter.emit(RequestEvents.Created, {
      requestId: storedRequest.id,
      tenantId: tenant.id,
      accessToken: attrs.accessToken,
      createdByUserId: userRequesterData.id,
    });

    return storedRequest;
  }

  private async getTenant(attrs: CreateRequestUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({ id: attrs.tenantId });
    if (!tenant) throw new TenantNotFoundException();
    return tenant;
  }

  private async getModule(attrs: { moduleId: string }) {
    const requestType = await this.moduleRepository.findById({
      id: attrs.moduleId,
    });
    if (!requestType) throw new RequestModuleNotFoundException();
    return requestType;
  }
}

export namespace CreateRequestUseCase {
  type UserDetails = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    googleTenantId: any;
  };

  export type GetUserDetailsResponse = InspireHttpResponse<UserDetails>;
  export type RequestModule = {
    moduleId: string;
    requestSettings: object;
  };

  export type InputAttrs = {
    modules: RequestModule[];
    tenantId: string;
    accessToken: string;
  };
}
