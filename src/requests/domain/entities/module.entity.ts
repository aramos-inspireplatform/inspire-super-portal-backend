import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class Module extends BaseDomainEntity {
  name: string;

  deployUrl: string;

  statusUrl: string;

  timeSpan: number;

  minimumTimeSpan: number;

  integrationKey: string;

  constructor(attrs: {
    id?: string;
    name: string;
    deployUrl: string;
    statusUrl: string;
    timeSpan: number;
    minimumTimeSpan: number;
    integrationKey: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  }) {
    super(attrs);
    this.name = attrs.name;
    this.deployUrl = attrs.deployUrl;
    this.statusUrl = attrs.statusUrl;
    this.timeSpan = attrs.timeSpan;
    this.minimumTimeSpan = attrs.minimumTimeSpan;
    this.integrationKey = attrs.integrationKey;
  }
}
