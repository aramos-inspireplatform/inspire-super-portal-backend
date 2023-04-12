import { RequestStatus } from '~/requests/domain/entities/request-status.entity';

export interface IRequestStatusesRepository {
  findById(
    attrs: IRequestStatusesRepository.FindByIdInputAttrs,
  ): IRequestStatusesRepository.FindByIdResult;
}

export namespace IRequestStatusesRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<RequestStatus | null>;
}
