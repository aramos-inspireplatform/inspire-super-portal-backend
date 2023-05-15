import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class RequestModuleStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: {
    id: string;
    name: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  }) {
    super(attrs);
    this.name = attrs.name;
  }
}
