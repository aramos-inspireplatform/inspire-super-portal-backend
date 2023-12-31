import { TenantStatusesDataMapper } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';

export const TenantStatusesMapper: IMapper<
  TenantStatus,
  TenantStatusesDataMapper
> = {
  domainToModel: (domain: TenantStatus): TenantStatusesDataMapper => {
    const model = new TenantStatusesDataMapper();
    model.id = domain.id;
    model.name = domain.name;
    model.slug = domain.slug;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: TenantStatusesDataMapper): TenantStatus => {
    if (!model) return;
    const domain = new TenantStatus({
      id: model.id,
      name: model.name,
      slug: model.slug,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
