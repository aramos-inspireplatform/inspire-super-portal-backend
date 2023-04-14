import { RequestStatus } from '~/requests/domain/entities/request-status.entity';

export interface IRequestModuleStatusRepository {
  findById(
    attrs: IRequestModuleStatusRepository.FindByIdInputAttrs,
  ): IRequestModuleStatusRepository.FindByIdResult;
}

export namespace IRequestModuleStatusRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<RequestStatus>;
}
