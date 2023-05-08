import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { RequestStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';

export const RequestStatusTypeOrmMapper: IMapper<
  RequestStatus,
  RequestStatuses
> = {
  domainToModel: (domain: RequestStatus): RequestStatuses => {
    return <RequestStatuses>{
      id: domain.id,
      name: domain.name,
      createdDate: domain.createdDate,
      updatedDate: domain.updatedDate,
      deletedDate: domain.deletedDate,
    };
  },
  modelToDomain: (model: RequestStatuses): RequestStatus => {
    return new RequestStatus({
      id: model.id,
      name: model.name,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
  },
};
