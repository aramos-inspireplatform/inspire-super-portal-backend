import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface IFindAllUserAgenciesDao {
  execute(
    params: IFindAllUserAgenciesDao.Input,
  ): IFindAllUserAgenciesDao.Output;
}

export namespace IFindAllUserAgenciesDao {
  export type Input = {
    accessToken: string;
    userId: string;
  };

  export type Output = Promise<Agency[]>;
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
  export type ApiResponse = InspireHttpResponse<AgencyApi[]>;
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
