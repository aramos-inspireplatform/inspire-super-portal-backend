import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllAgenciesDao {
  execute(params: IFindAllAgenciesDao.Input): IFindAllAgenciesDao.Output;
}

export namespace IFindAllAgenciesDao {
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
    defaultTenantId: DefaultTenantId;
  };

  // Additional types
  export type DefaultTenantId = {
    id: string;
    name: string;
    settings: Settings;
  };

  export type Settings = object;

  // Must be moved to API
  export type ApiResponse = InspireHttpPaginatedResponse<AgencyApi>;
  type AgencyApi = {
    id: string;
    name: string;
    defaultTenantId: DefaultTenantIdApi;
  };

  type DefaultTenantIdApi = {
    id: string;
    name: string;
    settings: SettingsApi;
  };

  type SettingsApi = object;
}
