import { RecurringIntervals } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';

export const RecurringIntervalsMapper: IMapper<
  RecurringInterval,
  RecurringIntervals
> = {
  domainToModel: (domain: RecurringInterval): RecurringIntervals => {
    const model = new RecurringIntervals();
    model.id = domain.id;
    model.name = domain.name;
    model.interval = domain.interval;
    model.isActive = domain.isActive;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: RecurringIntervals): RecurringInterval => {
    const domain = new RecurringInterval({
      id: model.id,
      name: model.name,
      interval: model.interval,
      isActive: model.isActive,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
