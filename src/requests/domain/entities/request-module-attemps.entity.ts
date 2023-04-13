import { RequestModuleAttemptsStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { RequestModules } from '~/shared/infra/database/entities';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModuleAttempts extends BaseDomainEntity {
  requestModuleAttempsStatus: RequestModuleAttemptsStatus;
  moduleRequest: RequestModules;
  provisionApiRequestBody?: object;
  provisionApiResponseBody?: object;
  provisionApiResponseStatusCode?: string;
  wrapperIntegrationId?: string;
  webhookResponseBody?: string;

  constructor(attrs: InstanceProperties<RequestModuleAttempts>) {
    super(attrs);
    this.requestModuleAttempsStatus = attrs.requestModuleAttempsStatus;
    this.moduleRequest = attrs.moduleRequest;
    this.provisionApiRequestBody = attrs.provisionApiRequestBody;
    this.provisionApiResponseBody = attrs.provisionApiResponseBody;
    this.provisionApiResponseStatusCode = attrs.provisionApiResponseStatusCode;
    this.wrapperIntegrationId = attrs.wrapperIntegrationId;
    this.webhookResponseBody = attrs.webhookResponseBody;
  }
}
