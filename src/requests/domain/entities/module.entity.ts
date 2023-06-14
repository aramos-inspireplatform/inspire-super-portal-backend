import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class Module extends BaseDomainEntity {
  name: string;
  deployUrl: string;
  statusUrl: string;
  integrationCode: string;
  timeSpan: number;
  minimumTimeSpan: number;
  integrationKey: string;

  constructor(attrs: {
    id?: string;
    name: string;
    deployUrl: string;
    statusUrl: string;
    integrationCode: string;
    timeSpan: number;
    minimumTimeSpan: number;
    integrationKey?: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
  }) {
    super(attrs);
    this.name = attrs.name;
    this.deployUrl = attrs.deployUrl;
    this.statusUrl = attrs.statusUrl;
    this.integrationCode = attrs.integrationCode;
    this.timeSpan = attrs.timeSpan;
    this.minimumTimeSpan = attrs.minimumTimeSpan;
    this.integrationKey = attrs.integrationKey;
  }

  calculateAvgTime(timeSpentMinutes: number) {
    const timeAvg = Math.ceil((this.timeSpan + timeSpentMinutes) / 2);
    this.timeSpan =
      timeAvg < this.minimumTimeSpan ? this.minimumTimeSpan : timeAvg;
  }
}
