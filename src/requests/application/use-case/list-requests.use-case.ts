import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';

export class ListRequestsUseCase {
  constructor(private readonly requestRepository: IRequestRepository) {}

  async execute(attrs: ListRequestsUseCase.InputAttrs) {
    const [requests, count] = await this.requestRepository.listAndCount({
      skip: attrs.pagination.page * attrs.pagination.pageSize,
      take: attrs.pagination.pageSize,
    });

    return {
      rows: requests,
      count,
      page: attrs.pagination.page ?? 0,
      pageSize: requests.length,
    };
  }
}

export namespace ListRequestsUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
    accessToken: string;
  };
}
