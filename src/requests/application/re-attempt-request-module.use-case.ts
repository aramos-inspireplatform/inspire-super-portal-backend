import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { CanOnlyReAttemptCanceledModuleRequest } from '~/requests/domain/exceptions/can-only-re-attempt-canceled-module-request.exception';
import { RequestModuleNotFoundException } from '~/requests/domain/exceptions/request-module-not-found.exception';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ReAttemptRequestModuleUseCase {
  constructor(
    private readonly requestModulesRepository: IRequestModuleRepository,
    private readonly httpClient: IHttpClient,
    private readonly requestRepository: IRequestRepository,
    private readonly inspireTenantService: IInspireTenantApiService,
  ) {}

  async handle(attrs: ReAttemptRequestModuleUseCase.InputAttrs) {
    const requestModule = await this.requestModulesRepository.findById(
      attrs.requestModuleId,
    );
    if (!requestModule) throw new RequestModuleNotFoundException();
    const isCanceledModule =
      requestModule.moduleRequestStatus.id ===
      ModuleRequestStatusesIds.Canceled;
    if (!isCanceledModule) throw new CanOnlyReAttemptCanceledModuleRequest();
    const request = await this.requestRepository.findByRequestModuleId(
      requestModule.id,
    );
    const requestModuleAttempt = requestModule.createAttempt({
      createdByUserId: request.createdByUserId,
    });
    const tenantDetails = await this.inspireTenantService.getTenantDetails({
      integrationCode: request.tenant.tenantId,
    });
    if (tenantDetails instanceof Error) throw tenantDetails;
    await this.callDeployUrl({
      request,
      requestModuleAttempt,
      requestModule,
      accessToken: attrs.accessToken,
      tenantDetails,
    });
    const updatedRequestModule = await this.requestModulesRepository.update(
      requestModule,
    );
    return updatedRequestModule;
  }

  async callDeployUrl({
    request,
    requestModuleAttempt,
    requestModule,
    tenantDetails,
    accessToken,
  }: {
    request: Request;
    requestModuleAttempt: RequestModuleAttempts;
    requestModule: RequestModules;
    tenantDetails: IInspireTenantApiService.TenantDetails;
    accessToken: string;
  }) {
    const payload = {
      callbackId: requestModuleAttempt.id,
      requestSettings: requestModule.requestSettings,
      tenant: request.tenant,
      tenantId: tenantDetails.googleTenantId,
      tenantSlug: tenantDetails.slug,
    };
    const url = requestModule.module.deployUrl;
    try {
      const response = await this.httpClient.post<InspireHttpResponse<any>>(
        url,
        payload,
        {
          headers: {
            authorization: accessToken,
            'x-integration-key': requestModule.module.integrationKey,
          },
        },
      );
      requestModuleAttempt.provisionApiRequestBody = payload;
      requestModuleAttempt.provisionApiResponseBody = response.data;
      requestModuleAttempt.provisionApiResponseStatusCode = response.status;
      requestModuleAttempt.requestModuleAttemptStatus = <any>{
        id: RequestModuleAttemptStatusesIds.Provisioning,
      };
      requestModule.moduleRequestStatus = <any>{
        id: ModuleRequestStatusesIds.Provisioning,
      };
    } catch (error) {
      requestModuleAttempt.provisionApiResponseBody = error;
      requestModuleAttempt.requestModuleAttemptStatus = <any>{
        id: RequestModuleAttemptStatusesIds.Failed,
      };
      requestModule.moduleRequestStatus = <any>{
        id: ModuleRequestStatusesIds.Canceled,
      };
    }
    return requestModuleAttempt;
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
