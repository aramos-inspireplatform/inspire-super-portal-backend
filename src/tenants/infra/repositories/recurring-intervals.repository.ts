import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { RecurringIntervals } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';
import { IRecurringIntervalsRepository } from '~/tenants/domain/repositories/recurring-intervals-repository.contract';

@Injectable()
export class RecurringIntervalsRepository
  implements IRecurringIntervalsRepository
{
  repository: Repository<RecurringIntervals>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository =
      this.dataSource.getRepository<RecurringIntervals>(RecurringIntervals);
  }

  async findById(
    attrs: IRecurringIntervalsRepository.FindByIdInputAttrs,
  ): IRecurringIntervalsRepository.FindByIdResult {
    const recurringIntervals = await this.repository
      .createQueryBuilder('recurringIntervals')
      .where('recurringIntervals.id = :id', { id: attrs.id })
      .getOne();

    return recurringIntervals
      ? new RecurringInterval(recurringIntervals)
      : null;
  }
}
