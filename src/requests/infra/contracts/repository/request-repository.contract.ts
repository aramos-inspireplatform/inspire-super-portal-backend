import { Request } from '~/requests/domain/entities/request.entity';

export interface IRequestRepository {
  create(request: Request): Promise<void>;
  findById(id: string): Promise<Request>;
  updateStatus(id: string, statusId: string): Promise<void>;
}
