import { RecurringIntervalsDataMapper } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RecurringInterval } from '~/tenants/domain/entities/recurring-intervals.entity';

export const RecurringIntervalsMapper: IMapper<
  RecurringInterval,
  RecurringIntervalsDataMapper
> = {
  domainToModel: (domain: RecurringInterval): RecurringIntervalsDataMapper => {
    const model = new RecurringIntervalsDataMapper();
    model.id = domain.id;
    model.name = domain.name;
    model.interval = domain.interval;
    model.isActive = domain.isActive;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: RecurringIntervalsDataMapper): RecurringInterval => {
    if (!model) return;
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
