import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class RequestModuleAttempts extends BaseDomainEntity {
  requestModuleAttemptStatus: RequestModuleAttemptStatus;
  createdByUserId: string;
  provisionApiRequestBody?: object;
  provisionApiResponseStatusCode?: number;
  provisionApiResponseBody?: object;
  webhookResponseBody?: object;

  constructor(attrs: RequestModuleAttempts.Constructor) {
    super(attrs);
    this.requestModuleAttemptStatus =
      attrs.requestModuleAttemptStatus ??
      <any>{ id: RequestModuleAttemptStatusesIds.Requested };
    this.createdByUserId = attrs.createdByUserId;
    this.provisionApiRequestBody = attrs.provisionApiRequestBody;
    this.provisionApiResponseStatusCode = attrs.provisionApiResponseStatusCode;
    this.provisionApiResponseBody = attrs.provisionApiResponseBody;
    this.webhookResponseBody = attrs.webhookResponseBody;
  }

  setSucceeded() {
    this.requestModuleAttemptStatus = <any>{
      id: RequestModuleAttemptStatusesIds.Completed,
    };
  }

  setFailed() {
    this.requestModuleAttemptStatus = <any>{
      id: RequestModuleAttemptStatusesIds.Failed,
    };
  }

  get succeeded() {
    return (
      this.requestModuleAttemptStatus.id ===
      RequestModuleAttemptStatusesIds.Completed
    );
  }

  isFailed() {
    return (
      this.requestModuleAttemptStatus.id ===
      RequestModuleAttemptStatusesIds.Failed
    );
  }
}

export namespace RequestModuleAttempts {
  export type Constructor = {
    id?: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    requestModuleAttemptStatus?: RequestModuleAttemptStatus;
    createdByUserId: string;
    provisionApiRequestBody?: object;
    provisionApiResponseStatusCode?: number;
    provisionApiResponseBody?: object;
    webhookResponseBody?: object;
  };
}
