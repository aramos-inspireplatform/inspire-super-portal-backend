import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class RequestCreatedEventUseCase {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly requestRepository: IRequestRepository,
    private readonly inspireTenantService: IInspireTenantService,
  ) {}

  async handle(attrs: RequestCreatedEventUseCase.InputAttrs) {
    const request = await this.requestRepository.findById(attrs.requestId);
    const tenantDetails = await this.inspireTenantService.getTenantDetails({
      wrapperIntegrationId: request.tenant.tenantId,
    });
    if (tenantDetails instanceof Error) return;
    const requestModuleAttemptStatus = <any>{
      id: RequestModuleAttemptStatusesIds.Provisioning,
    };
    await Promise.all(
      request.requestModules.map(async (requestModule) => {
        const requestModuleAttempt = requestModule.createAttempt({
          createdByUserId: attrs.createdByUserId,
          requestModuleAttemptStatus,
        });
        await this.callDeployUrl(
          requestModuleAttempt,
          requestModule,
          request,
          tenantDetails,
          attrs,
        );
        requestModule.attempts += 1;
        return {
          requestModuleAttempt,
          moduleId: requestModule.id,
        };
      }),
    );
    request.requestStatus = <any>{ id: RequestStatusesIds.Pending };
    await this.requestRepository.update(request);
  }

  private async callDeployUrl(
    requestModuleAttempt: RequestModuleAttempts,
    requestModule: RequestModules,
    request: Request,
    tenantDetails: IInspireTenantService.TenantDetails,
    attrs: RequestCreatedEventUseCase.InputAttrs,
  ) {
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
            authorization: attrs.accessToken,
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
    }
  }
}

export namespace RequestCreatedEventUseCase {
  export type InputAttrs = {
    requestId: string;
    tenantId: string;
    accessToken: string;
    createdByUserId: string;
  };
}
