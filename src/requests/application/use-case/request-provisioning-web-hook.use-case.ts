import { RequestModuleAttemptStatusesConstant } from '~/requests/domain/constants/request-module-attempt-statuses.constant';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';

export class RequestProvisioningWebHookUseCase {
  constructor(
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
    private readonly requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
    private readonly requestRepository: IRequestRepository,
  ) {}

  async execute(attrs: FailedRequestProvisioningUseCase.InputAttrs) {
    const requestModuleAttempt =
      await this.requestModuleAttemptsRepository.findById({
        id: attrs.requestModuleAttemptsId,
      });

    const requestModuleAttemptStatus =
      attrs.status === 'success'
        ? await this.requestModuleAttemptsStatusRepository.findById({
            id: RequestModuleAttemptStatusesConstant.Completed,
          })
        : await this.requestModuleAttemptsStatusRepository.findById({
            id: RequestModuleAttemptStatusesConstant.Failed,
          });

    requestModuleAttempt.requestModuleAttemptStatus =
      requestModuleAttemptStatus;

    await this.requestModuleAttemptsRepository.updateStatus({
      id: requestModuleAttempt.id,
      statusId: requestModuleAttempt.requestModuleAttemptStatus.id,
    });

    const request = await this.requestRepository.findById({
      id: requestModuleAttempt.moduleRequest.request.id,
    });
  }
}

export namespace FailedRequestProvisioningUseCase {
  export type InputAttrs = {
    requestModuleAttemptsId: string;
    status: 'success' | 'error';
  };
}
