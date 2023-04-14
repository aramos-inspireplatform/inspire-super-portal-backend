import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class Request extends BaseDomainEntity {
  tenant: Tenant;
  createdByUserId: string;
  createdByUserEmail: string;
  requestStatus: RequestStatus;
  requestModules: RequestModules[];

  constructor(attrs: InstanceProperties<Request>) {
    super(attrs);
    this.tenant = attrs.tenant;
    this.createdByUserId = attrs.createdByUserId;
    this.createdByUserEmail = attrs.createdByUserEmail;
    this.requestStatus = attrs.requestStatus;
    this.requestModules = attrs.requestModules;
  }
}
