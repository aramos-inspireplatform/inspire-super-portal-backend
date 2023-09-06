import { TenantStatusDomainEntity } from '~/payouts/domain/entities/tenant-status.entity';

export class TenantStatusAssembler {
  static assembly(
    input: Partial<TenantStatusAssembler.Input>,
  ): TenantStatusDomainEntity {
    if (!input) return new TenantStatusDomainEntity();
    return new TenantStatusDomainEntity({
      id: input.id,
      name: input.name,
      slug: input.slug,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
    });
  }
}

export namespace TenantStatusAssembler {
  export type Input = {
    id: string;
    name: string;
    slug: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };
}
