import { Module } from '~/requests/domain/entities/module.entity';
import { Modules } from '~/shared/infra/database/entities';
import { IMapper } from '~/shared/infra/database/mapper/mapper';

export const ModulesMapper: IMapper<Module, Modules> = {
  domainToModel: (domain: Module): Modules => {
    const model = new Modules();
    model.id = domain.id;
    model.name = domain.name;
    model.deployUrl = domain.deployUrl;
    model.integrationKey = domain.integrationKey;
    model.minimumTimeSpan = domain.minimumTimeSpan;
    model.statusUrl = domain.statusUrl;
    model.timeSpan = domain.timeSpan;
    model.createdDate = domain.createdDate;
    model.updatedDate = domain.updatedDate;
    model.deletedDate = domain.deletedDate;
    return model;
  },
  modelToDomain: (model: Modules): Module => {
    const domain = new Module({
      id: model.id,
      name: model.name,
      deployUrl: model.deployUrl,
      integrationCode: model.integrationCode,
      integrationKey: model.integrationKey,
      minimumTimeSpan: model.minimumTimeSpan,
      statusUrl: model.statusUrl,
      timeSpan: model.timeSpan,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
    return domain;
  },
};
