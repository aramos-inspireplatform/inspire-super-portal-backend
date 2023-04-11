import { ModuleRequestStatus } from '~/modules-requests/domain/entities/module-request-status.entity';
import { ModuleRequestType } from '~/modules-requests/domain/entities/module-request-types.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class ModuleRequest extends BaseDomainEntity {
  wrapperIntegrationId?: string;
  attempts: number;
  requestSettings: object;
  requestNotes?: object;
  apiRequestBody?: object;
  apiResponseBody?: object;
  moduleRequestStatus: ModuleRequestStatus;
  moduleRequestType: ModuleRequestType;
  tenant: Tenant;

  constructor(attrs: InstanceProperties<ModuleRequest>) {
    super(attrs);
    this.wrapperIntegrationId = attrs?.wrapperIntegrationId;
    this.attempts = attrs?.attempts;
    this.requestSettings = attrs?.requestSettings;
    this.requestNotes = attrs?.requestNotes;
    this.apiRequestBody = attrs?.apiRequestBody;
    this.apiResponseBody = attrs?.apiResponseBody;
    this.moduleRequestStatus = attrs?.moduleRequestStatus;
    this.moduleRequestType = attrs?.moduleRequestType;
    this.tenant = attrs?.tenant;
  }
}
