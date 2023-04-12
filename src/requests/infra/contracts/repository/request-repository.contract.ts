import { Request } from '~/requests/domain/entities/request.entity';

export interface IRequestRepository {
  save(attrs: IRequestRepository.SaveInputAttrs): IRequestRepository.SaveResult;
  listAndCount(
    attrs: IRequestRepository.ListInputAttrs,
  ): IRequestRepository.ListResult;
}

export namespace IRequestRepository {
  export type SaveInputAttrs = { request: Request };
  export type SaveResult = Promise<Request>;

  export type ListInputAttrs = {
    skip: number;
    take: number;
  };
  export type ListResult = Promise<[Request[], number]>;
}
