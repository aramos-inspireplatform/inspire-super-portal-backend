import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class ReAttemptRequestModuleUseCase {
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly requestModulesRepository: IRequestModuleRepository,
    private readonly requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
    private readonly httpClient: IHttpClient,
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
  ) {}

  async handle(attrs: ReAttemptRequestModuleUseCase.InputAttrs) {
    const previousModuleRequest = await this.requestModulesRepository.findById(
      attrs.requestModuleId,
    );
    if (!previousModuleRequest)
      throw new NotFoundException('exception:MODULE_REQUEST_NOT_FOUND');
    if (
      previousModuleRequest.moduleRequestStatus.id !==
      ModuleRequestStatusesIds.Failed
    )
      throw new BadRequestException(
        'exception:CAN_ONLY_RE_ATTEMPT_FAILED_MODULE_REQUEST',
      );

    previousModuleRequest.attempts += 1;

    const requestAttempt = await this.createRequestAttempt({
      accessToken: attrs.accessToken,
      createdByUserId: previousModuleRequest.request.createdByUserId,
      requestModule: previousModuleRequest,
      tenant: previousModuleRequest.request.tenant,
    });

    await this.requestModuleAttemptsRepository.createMultiple([requestAttempt]);

    await this.requestModulesRepository.updateAttempts(
      previousModuleRequest.id,
      previousModuleRequest.attempts,
    );
  }

  private async createRequestAttempt(attrs: {
    createdByUserId: string;
    requestModule: RequestModules;
    tenant: Tenant;
    accessToken: string;
  }) {
    const tenantDetails = await this.getTenantDetails(attrs);

    const requestModuleAttemptStatus =
      await this.getRequestModuleAttemptStatuses('Provisioning');

    const requestModuleAttempt = new RequestModuleAttempts({
      createdByUserId: attrs.createdByUserId,
      moduleRequest: attrs.requestModule,
      requestModuleAttemptStatus,
    });
    const payload = {
      callbackId: requestModuleAttempt.id,
      requestSettings: attrs.requestModule.requestSettings,
      tenant: attrs.tenant,
      tenantId: tenantDetails.googleTenantId,
      tenantSlug: tenantDetails.slug,
    };
    const url = attrs.requestModule.module.deployUrl;
    try {
      const response = await this.httpClient.post<InspireHttpResponse<any>>(
        url,
        payload,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
      requestModuleAttempt.provisionApiRequestBody = payload;
      requestModuleAttempt.provisionApiResponseBody = response.data;
      requestModuleAttempt.provisionApiResponseStatusCode = response.status;
    } catch (error) {
      const errorStatus = await this.getRequestModuleAttemptStatuses('Failed');
      requestModuleAttempt.provisionApiResponseBody = error;
      requestModuleAttempt.requestModuleAttemptStatus = errorStatus;
    }
    return requestModuleAttempt;
  }

  private async getRequestModuleAttemptStatuses(
    id: keyof typeof RequestModuleAttemptStatusesIds,
  ) {
    return this.requestModuleAttemptsStatusRepository.findById({
      id: RequestModuleAttemptStatusesIds[id],
    });
  }

  private async getTenantDetails(attrs: {
    accessToken: string;
    tenant: Tenant;
  }) {
    const url = `${this.TENANT_DETAILS_URL}/${attrs.tenant.wrapperIntegrationId}`;
    const responseOrError =
      await this.httpClient.get<ReAttemptRequestModuleUseCase.InspireTenantHttpResponse>(
        url,
        {
          headers: { authorization: attrs.accessToken },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace ReAttemptRequestModuleUseCase {
  export type InputAttrs = {
    accessToken: string;
    requestModuleId: string;
  };

  export type InspireTenant = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    logo: any;
    timezone: Timezone;
    languages: Languages;
    currencies: any[];
    agencies: Agencies;
  };

  type Settings = {
    teste: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Agencies = {
    id: string;
    name: string;
  };

  export type InspireTenantHttpResponse = InspireHttpResponse<InspireTenant>;
}
