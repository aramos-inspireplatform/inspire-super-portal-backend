import { Request } from '~/requests/domain/entities/request.entity';
import { Requests as RequestsTypeOrm } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RequestStatusTypeOrmMapper } from '~/shared/infra/database/mapper/request-status-typeorm.mapper';
import { TenantTypeOrmMapper } from '~/shared/infra/database/mapper/tenant-typeorm.mapper';

export class RequestTypeOrmMapper implements IMapper<Request, RequestsTypeOrm> {
  domainToModel(domain: Request): RequestsTypeOrm {
    return <RequestsTypeOrm>{
      id: domain.id,
      createdByUserEmail: domain.createdByUserEmail,
      createdByUserId: domain.createdByUserId,
      requestStatus: <any>{ id: domain.requestStatus.id },
      tenant: <any>{ id: domain.tenant.id },
    };
  }

  modelToDomain(model: RequestsTypeOrm): Request {
    return new Request({
      id: model.id,
      createdByUserEmail: model.createdByUserEmail,
      createdByUserId: model.createdByUserId,
      requestStatus: RequestStatusTypeOrmMapper.modelToDomain(
        model.requestStatus,
      ),
      tenant: TenantTypeOrmMapper.modelToDomain(model.tenant),
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
      // requestModules: model.requestModules.map((requestModule) => {

      // });
    });
  }
}
