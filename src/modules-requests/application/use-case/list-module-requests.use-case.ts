import { IModuleRequestRepository } from '~/modules-requests/infra/contracts/repository/module-request-repository.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';

export class ListModuleRequestUseCase {
  constructor(
    private readonly moduleRequestRepository: IModuleRequestRepository,
  ) {}

  async list(attrs: ListModuleRequestUseCase.InputAttrs) {
    const [moduleRequests, count] =
      await this.moduleRequestRepository.listAndCount({
        skip: attrs.pagination.page * attrs.pagination.pageSize,
        take: attrs.pagination.pageSize,
      });
    return {
      rows: moduleRequests,
      count,
    };
  }
}

export namespace ListModuleRequestUseCase {
  export type InputAttrs = {
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };

  export type ModuleRequest = {
    id: string;
    moduleId: string;
  };

  export type OutputAttrs = InspireHttpPaginatedResponse<ModuleRequest>;
}
