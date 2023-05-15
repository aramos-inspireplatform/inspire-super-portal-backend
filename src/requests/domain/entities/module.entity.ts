import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class Module extends BaseDomainEntity {
  name: string;

  deployUrl: string;

  constructor(attrs: {
    id?: string;
    name: string;
    deployUrl: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  }) {
    super(attrs);
    this.name = attrs.name;
    this.deployUrl = attrs.deployUrl;
  }
}
