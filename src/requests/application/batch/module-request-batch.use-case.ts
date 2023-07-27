import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { IRequestModuleRepository } from '~/requests/domain/repositories/request-module-repository.contract';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ModuleRequestBatchUseCase {
  MAX_ATTEMPTS_BATCH = 3;

  constructor(
    private readonly requestModuleRepository: IRequestModuleRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly inspireTenantService: IInspireTenantApiService,
    protected readonly httpClient: IHttpClient,
  ) {}

  async handle() {
    const requestModules = await this.requestModuleRepository.findBatch();
    if (!requestModules.length) return;
    const requestModules$ = requestModules.map(async (requestModule) => {
      requestModule.requestModuleAttempts.forEach((attempt) => {
        if (!attempt.isFailed()) attempt.setFailed();
      });
      if (requestModule.attempts >= this.MAX_ATTEMPTS_BATCH) {
        requestModule.setCanceled();
        return this.requestModuleRepository.update(requestModule);
      }
      return this.callDeployUrl(requestModule);
    });
    await Promise.all(requestModules$);
  }

  private async callDeployUrl(requestModule: RequestModules) {
    const request = await this.requestRepository.findByRequestModuleId(
      requestModule.id,
    );
    const tenantDetails = await this.inspireTenantService.getTenantDetails({
      integrationCode: request.tenant.tenantId,
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
            'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          },
        },
      );
      requestModuleAttempt.provisionApiRequestBody = payload;
      requestModuleAttempt.provisionApiResponseBody = response.data;
      requestModuleAttempt.provisionApiResponseStatusCode = response.status;
      requestModuleAttempt.requestModuleAttemptStatus = <any>{
        id: RequestModuleAttemptStatusesIds.Provisioning,
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
    return this.requestModuleRepository.update(requestModule);
  }
}
