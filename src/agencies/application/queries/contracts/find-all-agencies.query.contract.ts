import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllAgenciesQuery {
  execute(params: IFindAllAgenciesQuery.Input): IFindAllAgenciesQuery.Output;
}

export namespace IFindAllAgenciesQuery {
  export type Input = {
    accessToken: string;
    searchParams?: {
      page?: number;
      pageSize?: number;
      sortBy?: string;
      keywords?: string;
    };
  };

  export type Output = Promise<QueryPaginatedOutput<Agency>>;
  type Agency = {
    id: string;
    name: string;
    defaultTenant: DefaultTenant;
  };

  // Additional types
  export type DefaultTenant = {
    id: string;
    name: string;
    settings: Settings;
  };

  export type Settings = object;
}
