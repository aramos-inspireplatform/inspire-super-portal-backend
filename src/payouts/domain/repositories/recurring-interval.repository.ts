import { RecurringIntervalDomainEntity } from '~/payouts/domain/entities/recurring-interval.entity';

export interface IRecurringIntervalRepository {
  findOneById(
    params: IRecurringIntervalRepository.FindOneById,
  ): Promise<RecurringIntervalDomainEntity>;
}

export namespace IRecurringIntervalRepository {
  export type FindOneById = Partial<{
    id: string;
  }>;
}
