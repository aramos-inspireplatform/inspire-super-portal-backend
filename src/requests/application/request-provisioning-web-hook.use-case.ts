import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';

export class RequestProvisioningWebHookUseCase {
  constructor(
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
    private readonly requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly requestStautusRepository: IRequestStatusesRepository,
    private readonly requestModuleRepository: IRequestModuleRepository,
    private readonly requestModuleStatusRepository: IRequestModuleStatusRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusRepository: ITenantStatusesRepository,
  ) {}

  async handle(attrs: FailedRequestProvisioningUseCase.InputAttrs) {
    const requestModuleAttempt =
      await this.requestModuleAttemptsRepository.findById(
        attrs.requestModuleAttemptsId,
      );
    if (!requestModuleAttempt) return;
    const succeeded = attrs.status === 'success';
    const requestModuleAttemptStatus = succeeded
      ? await this.requestModuleAttemptsStatusRepository.findById({
          id: RequestModuleAttemptStatusesIds.Completed,
        })
      : await this.requestModuleAttemptsStatusRepository.findById({
          id: RequestModuleAttemptStatusesIds.Failed,
        });

    requestModuleAttempt.requestModuleAttemptStatus =
      requestModuleAttemptStatus;

    requestModuleAttempt.webhookResponseBody = attrs.webhookResponseBody;

    await this.requestModuleAttemptsRepository.updateStatus(
      requestModuleAttempt.id,
      requestModuleAttempt,
    );

    await this.requestModuleAttemptsRepository.updateWebhookResponse(
      requestModuleAttempt.id,
      requestModuleAttempt,
    );

    const requestModule = await this.requestModuleRepository.findById(
      requestModuleAttempt.moduleRequest.id,
    );

    requestModule.moduleRequestStatus = succeeded
      ? await this.requestModuleStatusRepository.findById({
          id: ModuleRequestStatusesIds.Completed,
        })
      : await this.requestModuleStatusRepository.findById({
          id: ModuleRequestStatusesIds.Failed,
        });

    await this.requestModuleRepository.updateStatus(
      requestModule.id,
      requestModule.moduleRequestStatus.id,
    );

    const request = await this.requestRepository.findById(
      requestModuleAttempt.moduleRequest.request.id,
    );

    const allRequestModulesFromRequest =
      await this.requestModuleRepository.findByRequestId(request.id);

    const allFailed = allRequestModulesFromRequest.filter(
      (rm) => rm.moduleRequestStatus.id === ModuleRequestStatusesIds.Failed,
    );

    const allCompleted = allRequestModulesFromRequest.filter(
      (rm) => rm.moduleRequestStatus.id === ModuleRequestStatusesIds.Completed,
    );

    if (allFailed.length === allRequestModulesFromRequest.length) {
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.Canceled,
      });
    } else if (allCompleted.length === allRequestModulesFromRequest.length) {
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.Completed,
      });
      const tenant = await this.tenantRepository.findById({
        id: request.tenant.id,
      });
      tenant.tenantStatus = await this.tenantStatusRepository.findById({
        id: TenantStatusesConstant.Active,
      });
      await this.tenantRepository.save({ tenant });
    } else if (
      allCompleted.length + allFailed.length ===
      allRequestModulesFromRequest.length
    ) {
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.PartiallyCompleted,
      });
    }

    await this.requestRepository.updateStatus(
      request.id,
      request.requestStatus.id,
    );
  }
}

export namespace FailedRequestProvisioningUseCase {
  export type InputAttrs = {
    requestModuleAttemptsId: string;
    status: 'success' | 'error';
    webhookResponseBody: object;
  };
}
