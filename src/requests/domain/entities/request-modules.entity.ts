import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModules extends BaseDomainEntity {
  module: Module;

  moduleRequestStatus: RequestModuleStatus;

  requestSettings: object;

  wrapperIntegrationId?: string;

  apiRequestBody?: object;

  apiResponseBody?: object;

  attempts: number;

  requestModuleAttempts?: RequestModuleAttempts[];

  constructor(attrs: {
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
  }) {
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

  createAttempt(attrs: InstanceProperties<RequestModuleAttempts>) {
    const requestModuleAttemp = new RequestModuleAttempts(attrs);
    this.requestModuleAttempts.push(requestModuleAttemp);
    return requestModuleAttemp;
  }
}
