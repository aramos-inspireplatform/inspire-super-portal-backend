import { RecurringIntervalsEnum } from '~/payouts/domain/enums';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class RecurringIntervalDomainEntity extends BaseDomainEntity {
  private name: string;
  private interval: string;
  private isActive: boolean;

  constructor(input?: Partial<RecurringIntervalDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  isDay(): boolean {
    return this.interval === RecurringIntervalsEnum.Intervals.DAY;
  }

  isWeek(): boolean {
    return this.interval === RecurringIntervalsEnum.Intervals.WEEK;
  }

  isMoth(): boolean {
    return this.interval === RecurringIntervalsEnum.Intervals.MONTH;
  }

  isYear(): boolean {
    return this.interval === RecurringIntervalsEnum.Intervals.YEAR;
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      interval: this.interval,
      isActive: this.isActive,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
  }
}

export namespace RecurringIntervalDomainEntity {
  export type Input = {
    id: string;
    name: string;
    interval: string;
    isActive: boolean;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  export type State = Input & {
    //adittional methods here
  };
}
