import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModules extends BaseDomainEntity {
  module: Module;
  moduleRequestStatus: RequestModuleStatus;
  requestSettings: object;
  request?: Request;
  wrapperIntegrationId?: string;
  apiRequestBody?: object;
  apiResponseBody?: object;
  attempts?: number;

  constructor(attrs: InstanceProperties<RequestModules>) {
    super(attrs);
    this.module = attrs.module;
    this.request = attrs.request;
    this.moduleRequestStatus = attrs.moduleRequestStatus;
    this.wrapperIntegrationId = attrs.wrapperIntegrationId;
    this.requestSettings = attrs.requestSettings;
    this.apiRequestBody = attrs.apiRequestBody;
    this.apiResponseBody = attrs.apiResponseBody;
    this.attempts = attrs.attempts ?? 0;
  }
}
