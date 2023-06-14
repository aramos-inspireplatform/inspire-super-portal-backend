import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleAttempts as TypeOrmRequestModuleAttempts } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RequestModuleAttemptsStatusesMapper } from '~/shared/infra/database/mapper/request-module-attempt-statuses.mapper';

export const RequestModuleAttemptsMapper: IMapper<
  RequestModuleAttempts,
  TypeOrmRequestModuleAttempts,
  { moduleRequestId: string }
> = {
  domainToModel: (
    domain: RequestModuleAttempts,
    additionalData: { moduleRequestId: string },
  ): TypeOrmRequestModuleAttempts => {
    const model = new TypeOrmRequestModuleAttempts();
    model.id = domain.id;
    model.createdByUserId = domain.createdByUserId;
    model.provisionApiRequestBody = domain.provisionApiRequestBody;
    model.provisionApiResponseBody = domain.provisionApiResponseBody;
    model.provisionApiResponseStatusCode =
      domain.provisionApiResponseStatusCode;
    model.webhookResponseBody = domain.webhookResponseBody;
    model.requestModuleAttemptStatus =
      RequestModuleAttemptsStatusesMapper.domainToModel(
        domain.requestModuleAttemptStatus,
      );
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    model.moduleRequest = <any>additionalData.moduleRequestId;
    return model;
  },
  modelToDomain: (
    model: TypeOrmRequestModuleAttempts,
  ): RequestModuleAttempts => {
    const domain = new RequestModuleAttempts({
      id: model.id,
      createdByUserId: model.createdByUserId,
      provisionApiRequestBody: model.provisionApiRequestBody,
      provisionApiResponseBody: model.provisionApiResponseBody,
      provisionApiResponseStatusCode: model.provisionApiResponseStatusCode,
      webhookResponseBody: model.webhookResponseBody,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
      requestModuleAttemptStatus:
        RequestModuleAttemptsStatusesMapper.modelToDomain(
          model.requestModuleAttemptStatus,
        ),
    });
    return domain;
  },
};
