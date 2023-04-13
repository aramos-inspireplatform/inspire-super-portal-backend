import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempt-status.entity';
import { RequestModule } from '~/requests/domain/entities/request-module.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModuleAttempt extends BaseDomainEntity {
  requestModuleAttemptStatus: RequestModuleAttemptStatus;
  moduleRequest: RequestModule;
  createdByUserId: string;
  provisionApiRequestBody?: object;
  provisionApiResponseBody?: object;
  provisionApiResponseStatusCode?: number;
  wrapperIntegrationId?: string;
  webhookResponseBody?: object;

  constructor(attrs: InstanceProperties<RequestModuleAttempt>) {
    super(attrs);
    this.requestModuleAttemptStatus = attrs?.requestModuleAttemptStatus;
    this.moduleRequest = attrs?.moduleRequest;
    this.createdByUserId = attrs?.createdByUserId;
    this.provisionApiRequestBody = attrs?.provisionApiRequestBody;
    this.provisionApiResponseBody = attrs?.provisionApiResponseBody;
    this.provisionApiResponseStatusCode = attrs?.provisionApiResponseStatusCode;
    this.wrapperIntegrationId = attrs?.wrapperIntegrationId;
    this.webhookResponseBody = attrs?.webhookResponseBody;
  }
}
