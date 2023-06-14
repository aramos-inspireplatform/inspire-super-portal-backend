import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { TenantStatusesIds } from '~/requests/domain/constants/tenant-statuses-ids.constant';
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
    });
    this.requestModules.push(requestModule);
    return requestModule;
  }

  updateRequestStatusFromModules() {
    const allFailed = this.requestModules.filter((rm) => rm.isFailed());
    const allCompleted = this.requestModules.filter((rm) => rm.isCompleted());
    const allModulesProvided =
      allCompleted.length === this.requestModules.length;
    const allModulesProvidedFailed =
      allFailed.length === this.requestModules.length;
    const allModulesProvidedContainingErrors =
      allCompleted.length + allFailed.length === this.requestModules.length &&
      !allModulesProvided &&
      !allModulesProvidedFailed;
    if (allModulesProvided) {
      this.requestStatus = <any>{ id: RequestStatusesIds.Completed };
      this.tenant.tenantStatus = <any>{ id: TenantStatusesIds.Active };
    }
    if (allModulesProvidedFailed) {
      this.requestStatus = <any>{ id: RequestStatusesIds.Canceled };
      this.tenant.tenantStatus = <any>{ id: TenantStatusesIds.Pending };
    }
    if (allModulesProvidedContainingErrors) {
      this.requestStatus = <any>{ id: RequestStatusesIds.PartiallyCompleted };
      this.tenant.tenantStatus = <any>{ id: TenantStatusesIds.Pending };
    }
    return {
      allModulesProvided,
      allModulesProvidedFailed,
      allModulesProvidedContainingErrors,
    };
  }

  getRequestModuleAttempt(requestAttemptId: string) {
    for (const requestModule of this.requestModules) {
      for (const requestModuleAttempt of requestModule.requestModuleAttempts) {
        if (requestModuleAttempt.id === requestAttemptId) {
          return requestModuleAttempt;
        }
      }
    }
  }

  getRequestModuleFromModuleAttempt(requestAttemptId: string) {
    for (const requestModule of this.requestModules) {
      for (const requestModuleAttempt of requestModule.requestModuleAttempts) {
        if (requestModuleAttempt.id === requestAttemptId) {
          return requestModule;
        }
      }
    }
  }

  getRequestModule(requestModuleId: string) {
    for (const requestModule of this.requestModules) {
      if (requestModule.id === requestModuleId) {
        return requestModule;
      }
    }
  }
}
