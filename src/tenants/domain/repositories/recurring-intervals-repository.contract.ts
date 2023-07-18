import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';

export interface IRecurringIntervalsRepository {
  findById(
    attrs: IRecurringIntervalsRepository.FindByIdInputAttrs,
  ): IRecurringIntervalsRepository.FindByIdResult;
}

export namespace IRecurringIntervalsRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<RecurringInterval | null>;
}
