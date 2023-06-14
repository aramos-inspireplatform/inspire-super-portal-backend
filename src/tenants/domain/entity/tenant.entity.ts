import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';

export class Tenant extends BaseDomainEntity {
  name: string;

  integrationCode: string;

  tenantId: string;

  createdByUserId: string;

  createdByUserEmail: string;

  tenantStatus: TenantStatus;

  slug?: string;

  constructor(attrs: InstanceProperties<Tenant>) {
    super(attrs);
    this.name = attrs?.name;
    this.integrationCode = attrs?.integrationCode;
    this.tenantId = attrs?.tenantId;
    this.createdByUserId = attrs?.createdByUserId;
    this.createdByUserEmail = attrs?.createdByUserEmail;
    this.tenantStatus = attrs?.tenantStatus;
    this.slug = attrs?.slug;
  }
}
