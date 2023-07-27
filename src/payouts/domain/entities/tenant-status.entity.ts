import { TenantStatusesEnum } from '~/payouts/domain/enums/tenant-statuses.enum';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class TenantStatusDomainEntity extends BaseDomainEntity {
  private name: string;
  private slug: string;

  constructor(input?: Partial<TenantStatusDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  isPending(): boolean {
    return this.slug === TenantStatusesEnum.Slugs.PENDING;
  }

  isActive(): boolean {
    return this.slug === TenantStatusesEnum.Slugs.ACTIVE;
  }

  isInactive(): boolean {
    return this.slug === TenantStatusesEnum.Slugs.INACTIVE;
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
  }
}

export namespace TenantStatusDomainEntity {
  export type Input = {
    id: string;
    name: string;
    slug: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  export type State = Input & {
    //adittional methods here
  };
}
