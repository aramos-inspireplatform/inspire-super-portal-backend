import { InstanceProperties } from '~/shared/types/class-properties.type';

/**
 * Entities that extend from the base entity are already contemplated with the fields `createdDate`, `updatedDate`, `deletedDate` and `id` with automatic completion calling the `super` method.
 *
 * This is to avoid extreme repetitions in the class constructor.
 */
export abstract class BaseDomainEntity {
  id: string;
  createdDate?: Date;
  updatedDate?: Date;
  deleteDate?: Date;

  constructor(attrs: InstanceProperties<BaseDomainEntity>) {
    this.createdDate = attrs.createdDate;
    this.deleteDate = attrs.deleteDate;
    this.updatedDate = attrs.updatedDate;
  }
}
