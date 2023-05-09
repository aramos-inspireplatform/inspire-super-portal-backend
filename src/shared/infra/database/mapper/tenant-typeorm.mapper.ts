import { Tenants } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { TenantStatusTypeOrmMapper } from '~/shared/infra/database/mapper/tenant-status-typeorm.mapper';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export const TenantTypeOrmMapper: IMapper<Tenant, Tenants> = {
  domainToModel: (domain: Tenant): Tenants => {
    return {
      id: domain.id,
      name: domain.name,
      createdByUserEmail: domain.createdByUserEmail,
      createdByUserId: domain.createdByUserId,
      tenantId: domain.tenantId,
      wrapperIntegrationId: domain.wrapperIntegrationId,
      createdDate: domain.createdDate,
      updatedDate: domain.updatedDate,
      deletedDate: domain.deletedDate,
      tenantStatus: TenantStatusTypeOrmMapper.domainToModel(
        domain.tenantStatus,
      ),
    } as Tenants;
  },
  modelToDomain: (model: Tenants): Tenant => {
    return new Tenant({
      id: model.id,
      name: model.name,
      tenantStatus: TenantStatusTypeOrmMapper.modelToDomain(model.tenantStatus),
      createdByUserEmail: model.createdByUserEmail,
      createdByUserId: model.createdByUserId,
      tenantId: model.tenantId,
      wrapperIntegrationId: model.wrapperIntegrationId,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
  },
};
