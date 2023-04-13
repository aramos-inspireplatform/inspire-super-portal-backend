import { RequestModuleAttempt } from '~/requests/domain/entities/request-module-attempt.entity';

export interface IRequestModuleAttemptsRepository {
  save(
    attrs: IRequestModuleAttemptsRepository.SaveInputAttrs,
  ): IRequestModuleAttemptsRepository.SaveResult;
}

export namespace IRequestModuleAttemptsRepository {
  export type SaveInputAttrs = {
    requestModuleAttempt: RequestModuleAttempt;
  };

  export type SaveResult = Promise<RequestModuleAttempt>;
}
