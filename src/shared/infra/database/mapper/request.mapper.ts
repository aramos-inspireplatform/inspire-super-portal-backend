import { Request } from '~/requests/domain/entities/request.entity';
import { Requests } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RequestModulesMapper } from '~/shared/infra/database/mapper/request-modules.mapper';
import { RequestStatusesMapper } from '~/shared/infra/database/mapper/request-statuses.mapper';
import { TenantMapper } from '~/shared/infra/database/mapper/tenant.mapper';

export const RequestMapper: IMapper<Request, Requests> = {
  domainToModel: (domain: Request): Requests => {
    const model = new Requests();
    model.id = domain.id;
    model.createdByUserEmail = domain.createdByUserEmail;
    model.createdByUserId = domain.createdByUserId;
    model.tenant = TenantMapper.domainToModel(domain.tenant);
    model.requestStatus = RequestStatusesMapper.domainToModel(
      domain.requestStatus,
    );
    model.requestModules = domain.requestModules.map((value) =>
      RequestModulesMapper.domainToModel(value),
    );
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: Requests): Request => {
    if (!model) return;
    const domain = new Request({
      id: model.id,
      createdByUserEmail: model.createdByUserEmail,
      createdByUserId: model.createdByUserId,
      tenant: TenantMapper.modelToDomain(model.tenant),
      requestModules: model.requestModules.map((value) =>
        RequestModulesMapper.modelToDomain(value),
      ),
      requestStatus: RequestStatusesMapper.modelToDomain(model.requestStatus),
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
