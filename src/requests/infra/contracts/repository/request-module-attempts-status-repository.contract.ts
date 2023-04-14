import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';

export interface IRequestModuleAttemptsStatusRepository {
  findById(
    attrs: IRequestModuleAttemptsStatusRepository.FindByIdInputAttrs,
  ): IRequestModuleAttemptsStatusRepository.FindByIdResult;
}

export namespace IRequestModuleAttemptsStatusRepository {
  export type FindByIdInputAttrs = {
    id: string;
  };

  export type FindByIdResult = Promise<RequestModuleAttemptStatus>;
}
