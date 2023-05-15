import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { RequestModuleAttemptStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';

export const RequestModuleAttemptsStatusesMapper: IMapper<
  RequestModuleAttemptStatus,
  RequestModuleAttemptStatuses
> = {
  domainToModel: (
    domain: RequestModuleAttemptStatus,
  ): RequestModuleAttemptStatuses => {
    const model = new RequestModuleAttemptStatuses();
    model.id = domain.id;
    model.name = domain.name;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (
    model: RequestModuleAttemptStatuses,
  ): RequestModuleAttemptStatus => {
    const domain = new RequestModuleAttemptStatus({
      id: model.id,
      name: model.name,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
