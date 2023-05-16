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
    const requestModuleAttemp = new RequestModuleAttempts(attrs);
    this.requestModuleAttempts.push(requestModuleAttemp);
    this.attempts += 1;
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Provisioning,
    };
    return requestModuleAttemp;
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
    this.moduleRequestStatus = <any>{
      id: ModuleRequestStatusesIds.Canceled,
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
