import { Request } from '~/requests/domain/entities/request.entity';

export interface IRequestRepository {
  save(attrs: IRequestRepository.SaveInputAttrs): IRequestRepository.SaveResult;
  listAndCount(
    attrs: IRequestRepository.ListInputAttrs,
  ): IRequestRepository.ListResult;
  updateStatus(
    attrs: IRequestRepository.UpdateStatusInputAttrs,
  ): IRequestRepository.UpdateStatusResult;
  findById(
    attrs: IRequestRepository.FindByIdInputAttrs,
  ): IRequestRepository.FindByIdResult;
}

export namespace IRequestRepository {
  export type SaveInputAttrs = { request: Request };
  export type SaveResult = Promise<Request>;

  export type ListInputAttrs = {
    skip: number;
    take: number;
  };
  export type ListResult = Promise<[Request[], number]>;

  export type UpdateStatusInputAttrs = { id: string; statusId: string };
  export type UpdateStatusResult = Promise<void>;

  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<Request>;
}
