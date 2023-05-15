import { TenantStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';

export const TenantStatusesMapper: IMapper<TenantStatus, TenantStatuses> = {
  domainToModel: (domain: TenantStatus): TenantStatuses => {
    const model = new TenantStatuses();
    model.id = domain.id;
    model.name = domain.name;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: TenantStatuses): TenantStatus => {
    const domain = new TenantStatus({
      id: model.id,
      name: model.name,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
