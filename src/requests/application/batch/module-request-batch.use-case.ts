import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ModuleRequestBatchUseCase {
  MAX_ATTEMPTS_BATCH = 3;

  constructor(
    private readonly requestModuleRepository: IRequestModuleRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly inspireTenantService: IInspireTenantService,
    protected readonly httpClient: IHttpClient,
  ) {}

  async handle() {
    const requestModules = await this.requestModuleRepository.findBatch();
    if (!requestModules.length) return;
    const requestModules$ = requestModules.map(async (requestModule) => {
      if (
        requestModule.moduleRequestStatus.id !== ModuleRequestStatusesIds.Failed
      ) {
        requestModule.requestModuleAttempts.forEach((attempt) => {
          if (!attempt.isFailed()) attempt.setFailed();
        });
        return this.callDeployUrl(requestModule.id);
      }
      if (
        requestModule.moduleRequestStatus.id ===
          ModuleRequestStatusesIds.Failed &&
        requestModule.attempts > this.MAX_ATTEMPTS_BATCH
      ) {
        requestModule.setCanceled();
        return this.requestModuleRepository.update(requestModule);
      }
      return this.callDeployUrl(requestModule.id);
    });
    await Promise.all(requestModules$);
  }

  private async callDeployUrl(requestModuleId: string) {
    const request = await this.requestRepository.findByRequestModuleId(
      requestModuleId,
    );
    const requestModule = request.getRequestModule(requestModuleId);
    const tenantDetails = await this.inspireTenantService.getTenantDetails({
      wrapperIntegrationId: request.tenant.tenantId,
    });
    if (tenantDetails instanceof Error) return;
    const requestModuleAttempt = requestModule.createAttempt({
      createdByUserId: request.createdByUserId,
      createdDate: new Date(),
      provisionApiRequestBody: requestModule.apiRequestBody,
    });
    const payload = {
      callbackId: requestModuleAttempt.id,
      requestSettings: requestModule.requestSettings,
      tenant: request.tenant,
      tenantId: tenantDetails.googleTenantId,
      tenantSlug: tenantDetails.slug,
    };
    const url = requestModule.module.deployUrl;
    requestModule.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Provisioning,
    };
    try {
      const response = await this.httpClient.post<InspireHttpResponse<any>>(
        url,
        payload,
        {
          headers: {
            'x-integration-key': requestModule.module.integrationKey,
          },
        },
      );
      requestModuleAttempt.provisionApiRequestBody = payload;
      requestModuleAttempt.provisionApiResponseBody = response.data;
      requestModuleAttempt.provisionApiResponseStatusCode = response.status;
      requestModule.moduleRequestStatus = <any>{
        id: ModuleRequestStatusesIds.Provisioning,
      };
    } catch (error) {
      requestModule.moduleRequestStatus = <any>{
        id: ModuleRequestStatusesIds.Failed,
      };
      requestModuleAttempt.provisionApiResponseBody = error;
      requestModuleAttempt.requestModuleAttemptStatus = <any>{
        id: RequestModuleAttemptStatusesIds.Failed,
      };
    }
    return this.requestRepository.update(request);
  }
}
