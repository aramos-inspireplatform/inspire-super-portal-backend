export interface IFindAllUserAgenciesQuery {
  execute(
    params: IFindAllUserAgenciesQuery.Input,
  ): IFindAllUserAgenciesQuery.Output;
}

export namespace IFindAllUserAgenciesQuery {
  export type Input = {
    accessToken: string;
    userId: string;
  };

  export type Output = Promise<Agency[]>;
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
