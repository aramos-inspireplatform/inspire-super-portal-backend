import { RequestModule } from '~/requests/domain/entities/request-module.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class Request extends BaseDomainEntity {
  createdByUserId: string;
  createdByUserEmail: string;
  requestStatus: RequestStatus;
  tenant: Tenant;
  requestModules: RequestModule[];

  constructor(attrs: InstanceProperties<Request>) {
    super(attrs);
    this.createdByUserId = attrs?.createdByUserId;
    this.createdByUserEmail = attrs?.createdByUserEmail;
    this.requestStatus = attrs?.requestStatus;
    this.tenant = attrs?.tenant;
    this.requestModules = attrs?.requestModules;
  }
}
