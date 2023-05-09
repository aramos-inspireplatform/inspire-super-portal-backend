import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class RequestModuleAttemptStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: {
    name: string;
    id?: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  }) {
    super(attrs);
    this.name = attrs.name;
  }
}
