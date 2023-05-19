import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class RequestModules extends BaseDomainEntity {
  module: Module;

  moduleRequestStatus: RequestModuleStatus;

  requestSettings: object;

  wrapperIntegrationId?: string;

  apiRequestBody?: object;

  apiResponseBody?: object;

  attempts: number;

  requestModuleAttempts?: RequestModuleAttempts[];

  requestNotes?: object;

  constructor(attrs: RequestModules.Constructor) {
    super(attrs);
    this.module = attrs.module;
    this.moduleRequestStatus = attrs.moduleRequestStatus;
    this.wrapperIntegrationId = attrs.wrapperIntegrationId;
    this.requestSettings = attrs.requestSettings;
    this.apiRequestBody = attrs.apiRequestBody;
    this.apiResponseBody = attrs.apiResponseBody;
    this.attempts = attrs.attempts ?? 0;
    this.requestModuleAttempts = attrs.requestModuleAttempts ?? [];
  }

  createAttempt(attrs: RequestModuleAttempts.Constructor) {
    const requestModuleAttempt = new RequestModuleAttempts(attrs);
    this.requestModuleAttempts.push(requestModuleAttempt);
    this.attempts += 1;
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Provisioning,
    };
    return requestModuleAttempt;
  }

  isFailed() {
    return this.moduleRequestStatus.id === ModuleRequestStatusesIds.Failed;
  }

  isCompleted() {
    return this.moduleRequestStatus.id === ModuleRequestStatusesIds.Completed;
  }

  setCompleted() {
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Completed,
    };
  }

  setFailed() {
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Failed,
    };
  }

  setCanceled() {
    this.requestModuleAttempts.forEach((attempt) => {
      if (!attempt.isFailed()) attempt.setFailed();
    });
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Canceled,
    };
  }

  setProvisioning() {
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Provisioning,
    };
  }
}

export namespace RequestModules {
  export type Constructor = {
    id?: string;
    module: Module;
    moduleRequestStatus: RequestModuleStatus;
    requestSettings: object;
    wrapperIntegrationId?: string;
    apiRequestBody?: object;
    apiResponseBody?: object;
    attempts?: number;
    requestModuleAttempts?: RequestModuleAttempts[];
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  };
}
