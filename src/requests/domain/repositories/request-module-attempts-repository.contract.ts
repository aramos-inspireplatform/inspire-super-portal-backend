import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';

export interface IRequestModuleAttemptsRepository {
  createMultiple(
    attrs: {
      moduleId: string;
      requestModuleAttempt: RequestModuleAttempts;
    }[],
  ): Promise<void>;
  findById(id: string): Promise<RequestModuleAttempts | void>;
  updateStatus(id: string, entity: RequestModuleAttempts): Promise<void>;
  updateWebhookResponse(
    id: string,
    entity: RequestModuleAttempts,
  ): Promise<void>;
  update(attempt: RequestModuleAttempts): Promise<RequestModuleAttempts>;
}
