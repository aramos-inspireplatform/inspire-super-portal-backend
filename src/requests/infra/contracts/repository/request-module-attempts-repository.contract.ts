import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';

export interface IRequestModuleAttemptsRepository {
  createMultiple(requestModuleAttempts: RequestModuleAttempts[]): Promise<void>;
  findById(id: string): Promise<RequestModuleAttempts>;
  updateStatus(id: string, entity: RequestModuleAttempts): Promise<void>;
  updateWebhookResponse(
    id: string,
    entity: RequestModuleAttempts,
  ): Promise<void>;
}
