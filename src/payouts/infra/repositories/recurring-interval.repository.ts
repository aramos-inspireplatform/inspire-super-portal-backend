import { DataSource } from 'typeorm';
import { RecurringIntervalAssembler } from '~/payouts/application/assemblers/recurring-interval.assembler';
import { RecurringIntervalDomainEntity } from '~/payouts/domain/entities/recurring-interval.entity';
import { IRecurringIntervalRepository } from '~/payouts/domain/repositories/recurring-interval.repository';
import { RecurringIntervalsDataMapper } from '~/shared/infra/database/entities';

export class RecurringIntervalRepositoryTypeOrmAdapter
  implements IRecurringIntervalRepository
{
  private readonly entity = 'recurringIntervals';
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository =
      this.dataSource.getRepository<RecurringIntervalsDataMapper>(
        RecurringIntervalsDataMapper,
      );
  }

  async findOneById(
    params: IRecurringIntervalRepository.FindOneById,
  ): Promise<RecurringIntervalDomainEntity> {
    const query = this.repository.createQueryBuilder(this.entity);
    query.where(`${this.entity}.id = :id`, { id: params.id });
    const tenantStatus = await query.getOne();

    return tenantStatus
      ? RecurringIntervalAssembler.assembly(tenantStatus)
      : null;
  }
}
