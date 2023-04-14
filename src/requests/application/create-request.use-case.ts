import { NotFoundException } from '@nestjs/common';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { RequestEvents } from '~/shared/domain/events/request.events';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCase {
  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly tenantRepository: ITenantRepository,
    private readonly requestStatusRepository: IRequestStatusesRepository,
    private readonly moduleRepository: IModuleRepository,
    private readonly requestModulesStautusRepository: IRequestModuleStatusRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly eventEmitter: IEventEmitter,
  ) {}

  async handle(attrs: CreateRequestUseCase.InputAttrs) {
    const userRequesterData = await this.getUserDetails(attrs);
    const tenant = await this.getTenant(attrs);
    const requestStatus = await this.getSentRequestStatuses();
    const requestModules = await this.createRequestModules(attrs);

    const request = new Request({
      createdByUserEmail: userRequesterData.email,
      createdByUserId: userRequesterData.id,
      tenant,
      requestStatus,
      requestModules,
    });

    await this.requestRepository.create(request);

    this.eventEmitter.emit(RequestEvents.Created, {
      request,
      tenant,
      accessToken: attrs.accessToken,
      createdByUserId: userRequesterData.id,
    });

    return request;
  }

  private async getUserDetails(attrs: CreateRequestUseCase.InputAttrs) {
    const responseOrError =
      await this.httpClient.get<CreateRequestUseCase.GetUserDetailsResponse>(
        this.GET_USER_DETAILS_URL,
        { headers: { authorization: attrs.accessToken } },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }

  private async getTenant(attrs: CreateRequestUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({ id: attrs.tenantId });
    if (!tenant) throw new NotFoundException('exception:TENANT_NOT_FOUND');
    return tenant;
  }

  private async getSentRequestStatuses() {
    return this.requestStatusRepository.findById({
      id: RequestStatusesIds.Sent,
    });
  }

  async createRequestModules(attrs: CreateRequestUseCase.InputAttrs) {
    const moduleRequestStatus =
      await this.requestModulesStautusRepository.findById({
        id: ModuleRequestStatusesIds.Requested,
      });
    return Promise.all(
      attrs.modules.map(async (requestModule) => {
        const module = await this.getModule({
          moduleId: requestModule.moduleId,
        });
        return new RequestModules({
          module: new Module(module),
          requestSettings: requestModule.requestSettings,
          moduleRequestStatus: moduleRequestStatus,
        });
      }),
    );
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
