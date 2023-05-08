import { NotFoundException } from '@nestjs/common';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { Request } from '~/requests/domain/entities/request.entity';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { RequestEvents } from '~/shared/domain/events/request.events';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCase {
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly requestStatusRepository: IRequestStatusesRepository,
    private readonly moduleRepository: IModuleRepository,
    private readonly requestModulesStautusRepository: IRequestModuleStatusRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly eventEmitter: IEventEmitter,
    private readonly inspireTenantService: IInspireTenantService,
  ) {}

  async handle(attrs: CreateRequestUseCase.InputAttrs) {
    const userRequesterData =
      await this.inspireTenantService.getTenantUserDetails(attrs);
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
    if (!tenant) throw new NotFoundException('exception:TENANT_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return tenant;
  }

  private async getSentRequestStatuses() {
    return this.requestStatusRepository.findById({
      id: RequestStatusesIds.Sent,
    });
  }

  private async getModule(attrs: { moduleId: string }) {
    const requestType = await this.moduleRepository.findById({
      id: attrs.moduleId,
    });
    if (!requestType)
      throw new NotFoundException('exception:REQUEST_TYPE_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
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
