import { RequestModuleAttempt } from '~/requests/domain/entities/request-module-attempt.entity';

export interface IRequestModuleAttemptsRepository {
  save(
    attrs: IRequestModuleAttemptsRepository.SaveInputAttrs,
  ): IRequestModuleAttemptsRepository.SaveResult;

  findById(
    attrs: IRequestModuleAttemptsRepository.FindByIdAttrs,
  ): IRequestModuleAttemptsRepository.FindByIdResult;

  updateStatus(attrs: { statusId: string; id: string }): Promise<void>;
}

export namespace IRequestModuleAttemptsRepository {
  export type SaveInputAttrs = {
    requestModuleAttempt: RequestModuleAttempt;
  };

  export type SaveResult = Promise<RequestModuleAttempt>;

  export type FindByIdAttrs = {
    id: string;
  };

  export type FindByIdResult = Promise<RequestModuleAttempt>;
}
