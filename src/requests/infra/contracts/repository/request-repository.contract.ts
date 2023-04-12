import { Request } from '~/requests/domain/entities/request.entity';

export interface IRequestRepository {
  save(attrs: IRequestRepository.SaveInputAttrs): IRequestRepository.SaveResult;
}

export namespace IRequestRepository {
  export type SaveInputAttrs = { request: Request };
  export type SaveResult = Promise<Request>;
}
