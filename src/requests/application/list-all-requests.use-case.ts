import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';

export class ListAllRequestsUseCase {
  constructor(private readonly requestRepository: IRequestRepository) {}

  async handle(attrs: ListAllRequestsUseCase.InputAttrs) {
    const requests = await this.requestRepository.findAll(attrs);
    return requests;
  }
}

export namespace ListAllRequestsUseCase {
  export type InputAttrs = {
    page: number;
    pageSize: number;
  };
}
