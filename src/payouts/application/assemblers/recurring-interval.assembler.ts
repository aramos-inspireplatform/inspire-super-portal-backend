import { RecurringIntervalDomainEntity } from '~/payouts/domain/entities/recurring-interval.entity';

export class RecurringIntervalAssembler {
  static assembly(
    input?: RecurringIntervalAssembler.Input,
  ): RecurringIntervalDomainEntity {
    if (!input) return new RecurringIntervalDomainEntity();
    return new RecurringIntervalDomainEntity({
      id: input.id,
      name: input.name,
      interval: input.interval,
      isActive: input.isActive,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
    });
  }
}

export namespace RecurringIntervalAssembler {
  export type Input = Partial<{
    id: string;
    name: string;
    interval: string;
    isActive: boolean;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  }>;
}
