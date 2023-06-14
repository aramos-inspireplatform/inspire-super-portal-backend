import { Tenants } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { TenantStatusesMapper } from '~/shared/infra/database/mapper/tenant-statuses.mapper';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

// TODO: AQ???

export const TenantMapper: IMapper<Tenant, Tenants> = {
  domainToModel: (domain: Tenant): Tenants => {
    const model = new Tenants();
    model.id = domain.id;
    model.name = domain.name;
    model.integrationCode = domain.integrationCode;
    model.tenantStatus = <any>{ id: domain.tenantStatus.id };
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: Tenants): Tenant => {
    const domain = new Tenant({
      id: model.id,
      name: model.name,
      integrationCode: model.integrationCode,
      tenantStatus: TenantStatusesMapper.modelToDomain(model.tenantStatus),
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
      createdByUserEmail: model.createdByUserEmail,
      createdByUserId: model.createdByUserId,
      tenantId: model.tenantId,
    });
    return domain;
  },
};
