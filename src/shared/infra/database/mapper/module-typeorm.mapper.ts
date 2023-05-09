import { IMapper } from '~/shared/infra/database/mapper/mapper';
import { Modules as ModulesTypeOrm } from '~/shared/infra/database/entities';
import { Module } from '~/requests/domain/entities/module.entity';

export const ModuleTypeormMapper: IMapper<Module, ModulesTypeOrm> = {
  domainToModel: (domain: Module): ModulesTypeOrm => {
    return <ModulesTypeOrm>{
      id: domain.id,
      name: domain.name,
      createdDate: domain.createdDate,
      updatedDate: domain.updatedDate,
      deletedDate: domain.deletedDate,
    };
  },
  modelToDomain: (model: ModulesTypeOrm): Module => {
    return new Module({
      id: model.id,
      name: model.name,
      deployUrl: model.deployUrl,
      createdDate: model.createdDate,
      updatedDate: model.updatedDate,
      deletedDate: model.deletedDate,
    });
  },
};
