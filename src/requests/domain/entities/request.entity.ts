import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export type RequestAttrs = {
  id?: string;
  tenant: Tenant;
  createdByUserId: string;
  createdByUserEmail: string;
  requestStatus?: RequestStatus;
  requestModules?: RequestModules[];
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
};

export class Request extends BaseDomainEntity {
  tenant: Tenant;

  createdByUserId: string;

  createdByUserEmail: string;

  requestStatus: RequestStatus;

  requestModules: RequestModules[];

  constructor(attrs: RequestAttrs) {
    super(attrs);
    this.tenant = attrs.tenant;
    this.createdByUserId = attrs.createdByUserId;
    this.createdByUserEmail = attrs.createdByUserEmail;

    this.requestModules = attrs.requestModules ?? [];

    this.requestStatus =
      attrs.requestStatus ??
      <any>{
        id: RequestStatusesIds.Sent,
      };
  }

  addRequestModule(attrs: any) {
    const requestModule = new RequestModules({
      module: new Module(attrs.module),
      id: attrs.id,
      moduleRequestStatus: new RequestModuleStatus({
        id: ModuleRequestStatusesIds.Requested,
        name: 'Requested',
      }),
      requestSettings: attrs.requestSettings,
      apiRequestBody: attrs.apiRequestBody,
      apiResponseBody: attrs.apiResponseBody,
      attempts: 0,
      createdDate: new Date(),
      deletedDate: null,
      requestModuleAttempts: [],
      updatedDate: null,
      wrapperIntegrationId: attrs.wrapperIntegrationId,
    });
    this.requestModules.push(requestModule);
    return requestModule;
  }
}
