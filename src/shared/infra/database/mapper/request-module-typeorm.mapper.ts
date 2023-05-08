// import { RequestModules } from "~/requests/domain/entities/request-modules.entity"
// import { RequestModules as RequestModulesTypeOrm } from "~/shared/infra/database/entities"
// import { IMapper } from "~/shared/infra/database/mapper/mapper"
// import { ModuleTypeormMapper } from "~/shared/infra/database/mapper/module-typeorm.mapper"

// export const RequestModuleTypeOrmMapper: IMapper<RequestModules, RequestModulesTypeOrm> = {
//   domainToModel: (domain: RequestModules): RequestModulesTypeOrm => {
//     return <RequestModulesTypeOrm>{
//       id: domain.id,
//       name: domain.name,
//       createdDate: domain.createdDate,
//       updatedDate: domain.updatedDate,
//       deletedDate: domain.deletedDate,
//       alternativeId: undefined,
//       request: undefined,
//       moduleRequestType: ModuleTypeormMapper.domainToModel(domain.moduleRequestType),
//       apiRequestBody: domain.apiRequestBody,
//       apiResponseBody: domain.apiResponseBody,
//       attempts: domain.attempts,
//       moduleRequestStatus: ModuleRequestStatusTypeOrmMapper.domainToModel(domain.moduleRequestStatus),
//       requestModuleAttempts
//     }
//   }
// }
