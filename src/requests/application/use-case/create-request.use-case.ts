import { NotFoundException } from '@nestjs/common';
import { ModuleRequestTypes } from '~/requests/domain/constants/module-request-types.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses.constant';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModule } from '~/requests/domain/entities/request-module.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestCreatedEventHandler } from '~/requests/infra/events/request-created-event.handler';
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
    private readonly requestRepository: IRequestRepository,
    private readonly eventEmitter: IEventEmitter,
  ) {}

  async execute(attrs: CreateRequestUseCase.InputAttrs) {
    const userRequesterData = await this.getUserDetails(attrs);
    const tenant = await this.getTenant(attrs);
    const requestStatus = await this.getSentRequestStatuses();
    const requestModules = await this.createRequestModules(attrs);

    const request = new Request({
      createdByUserEmail: userRequesterData.email,
      createdByUserId: userRequesterData.id,
      requestModules,
      requestStatus,
      tenant: tenant,
    });

    await this.requestRepository.save({ request });

    this.eventEmitter.emit<RequestCreatedEventHandler.InputAttrs>(
      RequestEvents.Created,
      {
        accessToken: attrs.accessToken,
        tenant,
        request,
        createdByUserId: userRequesterData.id,
      },
    );

    return request;
  }

  private async getTenant(attrs: CreateRequestUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({ id: attrs.tenantId });
    if (!tenant) throw new NotFoundException('exception:TENANT_NOT_FOUND');
    return tenant;
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

  async createRequestModules(attrs: CreateRequestUseCase.InputAttrs) {
    return Promise.all(
      attrs.requestModules.map(async (requestModule) => {
        const module = await this.getModule({
          moduleId: requestModule.moduleId,
        });
        return new RequestModule({
          module: new Module(module),
          settings: requestModule.moduleSettings,
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

  private async getSentRequestStatuses() {
    return this.requestStatusRepository.findById({
      id: RequestStatusesIds.Sent,
    });
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

  type RequestModules = {
    moduleId: (typeof ModuleRequestTypes)[keyof typeof ModuleRequestTypes];
    moduleSettings: object;
  };

  export type InputAttrs = {
    tenantId: string; //UUID
    accessToken: string; // Com isso pegamos o user id e o email no projeto de tenant. Primeira coisa a se fazer.
    requestModules: RequestModules[];
  };
}

/**
 * 1 - Pegar os dados do user na aplicação de tenant, rota /me usando o token.
 * 2 - Criar todos os module requests (Como já criamos)
 * 3 - Criar o registro de request (Com o status de `Sent`)
 * 4 - Criar os registros em request_module_requests (Lista de todos os `module requests` com o `request`)
 */
