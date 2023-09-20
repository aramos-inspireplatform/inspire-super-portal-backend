import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { RequestStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';

export const RequestStatusesMapper: IMapper<RequestStatus, RequestStatuses> = {
  domainToModel: (domain: RequestStatus): RequestStatuses => {
    const model = new RequestStatuses();
    model.id = domain.id;
    model.name = domain.name;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: RequestStatuses): RequestStatus => {
    if (!model) return;
    const domain = new RequestStatus({
      id: model.id,
      name: model.name,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
