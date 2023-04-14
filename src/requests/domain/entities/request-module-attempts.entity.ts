import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModuleAttempts extends BaseDomainEntity {
  requestModuleAttemptStatus: RequestModuleAttemptStatus;
  moduleRequest: RequestModules;
  createdByUserId: string;
  provisionApiRequestBody?: object;
  provisionApiResponseStatusCode?: number;
  provisionApiResponseBody?: object;
  wrapperIntegrationId?: string;
  webhookResponseBody?: object;

  constructor(attrs: InstanceProperties<RequestModuleAttempts>) {
    super(attrs);
    this.requestModuleAttemptStatus = attrs.requestModuleAttemptStatus;
    this.moduleRequest = attrs.moduleRequest;
    this.createdByUserId = attrs.createdByUserId;
    this.provisionApiRequestBody = attrs.provisionApiRequestBody;
    this.provisionApiResponseStatusCode = attrs.provisionApiResponseStatusCode;
    this.provisionApiResponseBody = attrs.provisionApiResponseBody;
    this.wrapperIntegrationId = attrs.wrapperIntegrationId;
    this.webhookResponseBody = attrs.webhookResponseBody;
  }
}
