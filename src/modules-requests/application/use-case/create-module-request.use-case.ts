import { ConflictException, NotFoundException } from '@nestjs/common';
import { ModuleRequestStatusesConstant } from '~/modules-requests/domain/constants/module-request-statuses.constant';
import { ModuleRequest } from '~/modules-requests/domain/entities/module-request.entity';
import { IModuleRequestRepository } from '~/modules-requests/infra/contracts/repository/module-request-repository.contract';
import { IModuleRequestStatusesRepository } from '~/modules-requests/infra/contracts/repository/module-request-statuses-repository.contract';
import { IModuleRequestTypeRepository } from '~/modules-requests/infra/contracts/repository/module-request-type-repository.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateModuleRequestUseCase {
  constructor(
    private readonly moduleRequestStatusesRepository: IModuleRequestStatusesRepository,
    private readonly moduleRequestTypeRepository: IModuleRequestTypeRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly moduleRequestRepository: IModuleRequestRepository,
  ) {}

  async handle(attrs: CreateModuleRequestUseCase.InputAttrs) {
    await this.verifyIfModuleAlreadyProvided(attrs);
    const requestedStatuses = await this.findRequestStatuses();
    const moduleRequestType = await this.findRequestType(attrs);
    const requestTenant = await this.findTenant(attrs);
    const moduleRequest = new ModuleRequest({
      attempts: 0,
      moduleRequestStatus: requestedStatuses,
      moduleRequestType: moduleRequestType,
      requestSettings: attrs.settings,
      tenant: requestTenant,
    });
    await this.moduleRequestRepository.save({ moduleRequest });
    return moduleRequest;
  }

  private async findTenant(attrs: CreateModuleRequestUseCase.InputAttrs) {
    const tenant = await this.tenantRepository.findById({
      id: attrs.tenantId,
    });
    if (!tenant) throw new NotFoundException('exception:TENANT_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return tenant;
  }

  private async findRequestType(attrs: CreateModuleRequestUseCase.InputAttrs) {
    const requestType = await this.moduleRequestTypeRepository.findById({
      id: attrs.moduleId,
    });
    if (!requestType)
      throw new NotFoundException('exception:REQUEST_TYPE_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return requestType;
  }

  private async findRequestStatuses() {
    const requestStatuses = await this.moduleRequestStatusesRepository.findById(
      {
        id: ModuleRequestStatusesConstant.Requested,
      },
    );
    if (!requestStatuses)
      throw new NotFoundException('exception:REQUEST_STATUSES_NOT_FOUND'); // TODO: colocar isso numa classe especifica para esse erro
    return requestStatuses;
  }

  private async verifyIfModuleAlreadyProvided(
    attrs: CreateModuleRequestUseCase.InputAttrs,
  ) {
    const module = await this.moduleRequestRepository.findByIdAndTenant({
      id: attrs.moduleId,
      tenantId: attrs.tenantId,
    });
    if (module)
      throw new ConflictException('exception:MODULE_ALREADY_PROVIDED'); // TODO: colocar isso numa classe especifica para esse erro
  }
}

export namespace CreateModuleRequestUseCase {
  export type InputAttrs = {
    moduleId: string;
    tenantId: string;
    settings: any;
  };
}
