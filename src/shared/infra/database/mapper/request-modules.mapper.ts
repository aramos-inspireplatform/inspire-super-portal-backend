import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { RequestModules as TypeOrmRequestModules } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { RequestModuleStatusesMapper } from '~/shared/infra/database/mapper/module-request-statuses.mapper';
import { ModulesMapper } from '~/shared/infra/database/mapper/modules.mapper';
import { RequestModuleAttemptsMapper } from '~/shared/infra/database/mapper/request-module-attempts.mapper';

export const RequestModulesMapper: IMapper<
  RequestModules,
  TypeOrmRequestModules
> = {
  domainToModel: (domain: RequestModules): TypeOrmRequestModules => {
    const model = new TypeOrmRequestModules();
    model.id = domain.id;
    model.wrapperIntegrationId = domain.wrapperIntegrationId;
    model.attempts = domain.attempts;
    model.requestSettings = domain.requestSettings;
    model.requestNotes = domain.requestNotes;
    model.apiRequestBody = domain.apiRequestBody;
    model.apiResponseBody = domain.apiResponseBody;
    model.requestModuleAttempts = domain.requestModuleAttempts.map((value) =>
      RequestModuleAttemptsMapper.domainToModel(value, {
        moduleRequestId: domain.id,
      }),
    );
    model.moduleRequestStatus = RequestModuleStatusesMapper.domainToModel(
      domain.moduleRequestStatus,
    );
    model.module = ModulesMapper.domainToModel(domain.module);
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: TypeOrmRequestModules): RequestModules => {
    const domain = new RequestModules({
      id: model.id,
      wrapperIntegrationId: model.wrapperIntegrationId,
      module: ModulesMapper.modelToDomain(model.module),
      attempts: model.attempts,
      moduleRequestStatus: RequestModuleStatusesMapper.modelToDomain(
        model.moduleRequestStatus,
      ),
      requestSettings: model.requestSettings,
      apiRequestBody: model.apiRequestBody,
      apiResponseBody: model.apiResponseBody,
      requestModuleAttempts: model.requestModuleAttempts.map((value) =>
        RequestModuleAttemptsMapper.modelToDomain(value),
      ),
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
