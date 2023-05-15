import { Request } from '~/requests/domain/entities/request.entity';

export interface IRequestRepository {
  create(request: Request): any;
  findById(id: string): Promise<Request>;
  updateStatus(id: string, statusId: string): Promise<void>;
  findAll(attrs: {
    page: number;
    pageSize: number;
  }): Promise<[Request[], number]>;
  update(request: Request): Promise<void>;
  findByRequestModuleId(requestModuleId: string): Promise<Request | null>;
  findByAttemptId(attemptId: string): Promise<Request | null>;
}
