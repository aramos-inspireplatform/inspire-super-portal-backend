import { NotFoundException } from '@nestjs/common';
import { ModuleRequestStatusesConstant } from '~/requests/domain/constants/module-request-statuses.constant';
import { ModuleRequestTypes } from '~/requests/domain/constants/module-request-types.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses.constant';
import { ModuleRequest } from '~/requests/domain/entities/module-request.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IModuleRequestStatusesRepository } from '~/requests/infra/contracts/repository/module-request-statuses-repository.contract';
import { IModuleRequestTypeRepository } from '~/requests/infra/contracts/repository/module-request-type-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCase {
  private readonly GET_USER_DETAILS_URL = `${process.env.TENANT_URL}/user/me`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly moduleRequestStatusesRepository: IModuleRequestStatusesRepository,
    private readonly moduleRequestTypeRepository: IModuleRequestTypeRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly requestStatusesRepository: IRequestStatusesRepository,
    private readonly requestRepository: IRequestRepository,
  ) {}

  async execute(attrs: CreateRequestUseCase.InputAttrs) {
    const userRequesterData = await this.getUserDetails(attrs);
    const requestStatus = await this.getRequestStauses();
    const requestModuleRequests = await this.createModuleRequests(attrs);
    const tenant = await this.tenantRepository.findById({ id: attrs.tenantId });
    if (!tenant) throw new NotFoundException('exception:TENANT_NOT_FOUND');
    const request = new Request({
      createdByUserEmail: userRequesterData.email,
      createdByUserId: userRequesterData.id,
      requestStatus,
      tenant,
      requestModuleRequests,
    });
    return this.requestRepository.save({ request });
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

  private async createModuleRequests(attrs: CreateRequestUseCase.InputAttrs) {
    const moduleRequestStatus = await this.getModuleRequestStatuses();
    const modules = await Promise.all(
      attrs.moduleRequests.map(async (request) => {
        const moduleRequestType = await this.getModuleRequestType({
          moduleId: request.moduleId,
        });
        const moduleRequest = new ModuleRequest({
          attempts: 0,
          moduleRequestStatus,
          moduleRequestType,
          requestSettings: request.moduleSettings,
        });
        return moduleRequest;
      }),
    );
    return modules;
  }

  private async getModuleRequestStatuses() {
    const requestStatuses = await this.moduleRequestStatusesRepository.findById(
      {
        id: ModuleRequestStatusesConstant.Requested,
      },
    );
    if (!requestStatuses)
      throw new NotFoundException('exception:REQUEST_STATUSES_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return requestStatuses;
  }

  private async getModuleRequestType(attrs: { moduleId: string }) {
    const requestType = await this.moduleRequestTypeRepository.findById({
      id: attrs.moduleId,
    });
    if (!requestType)
      throw new NotFoundException('exception:REQUEST_TYPE_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return requestType;
  }

  private async getRequestStauses() {
    return this.requestStatusesRepository.findById({
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

  type ModuleRequest = {
    moduleId: (typeof ModuleRequestTypes)[keyof typeof ModuleRequestTypes];
    moduleSettings: object;
  };

  export type InputAttrs = {
    tenantId: string; //UUID
    accessToken: string; // Com isso pegamos o user id e o email no projeto de tenant. Primeira coisa a se fazer.
    moduleRequests: ModuleRequest[];
  };
}

/**
 * 1 - Pegar os dados do user na aplicação de tenant, rota /me usando o token.
 * 2 - Criar todos os module requests (Como já criamos)
 * 3 - Criar o registro de request (Com o status de `Sent`)
 * 4 - Criar os registros em request_module_requests (Lista de todos os `module requests` com o `request`)
 */
