import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';

export class Tenant extends BaseDomainEntity {
  name: string;

  wrapperIntegrationId: string;

  createdByUserId: string;

  tenantStatus: TenantStatus;

  constructor(attrs: InstanceProperties<Tenant>) {
    super(attrs);
    this.name = attrs.name;
    this.wrapperIntegrationId = attrs.wrapperIntegrationId;
    this.createdByUserId = attrs.createdByUserId;
    this.tenantStatus = attrs.tenantStatus;
  }
}
