import { TenantStatuses } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';

export const TenantStatusTypeOrmMapper: IMapper<TenantStatus, TenantStatuses> =
  {
    domainToModel: (domain: TenantStatus): TenantStatuses => {
      return <TenantStatuses>{
        id: domain.id,
        name: domain.name,
        createdDate: domain.createdDate,
        updatedDate: domain.updatedDate,
        deletedDate: domain.deletedDate,
      };
    },
    modelToDomain: (model: TenantStatuses): TenantStatus => {
      return new TenantStatus({
        id: model.id,
        name: model.name,
        createdDate: model.createdDate,
        updatedDate: model.updatedDate,
        deletedDate: model.deletedDate,
      });
    },
  };
