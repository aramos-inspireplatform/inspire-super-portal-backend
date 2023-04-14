import { RequestModules } from '~/requests/domain/entities/request-modules.entity';

export interface IRequestModuleRepository {
  findByRequestId(requestId: string): Promise<RequestModules[]>;
  findById(id: string): Promise<RequestModules>;
  updateStatus(id: string, statusId: string): Promise<void>;
}
