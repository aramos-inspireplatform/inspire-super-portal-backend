import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { ModuleRequestStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';

export const RequestModuleStatusesMapper: IMapper<
  RequestModuleStatus,
  ModuleRequestStatuses
> = {
  domainToModel: (domain: RequestModuleStatus): ModuleRequestStatuses => {
    const model = new ModuleRequestStatuses();
    model.id = domain.id;
    model.name = domain.name;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: ModuleRequestStatuses): RequestModuleStatus => {
    if (!model) return;
    const domain = new RequestModuleStatus({
      id: model.id,
      name: model.name,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
