export interface IInspireTenantService {
  getTenantUserDetails(
    attrs: IInspireTenantService.GetTenantUserDetailsInputAttrs,
  ): IInspireTenantService.UserDetailsResult;

  getTenantDetails(
    attrs: IInspireTenantService.GetTenantDetailsInputAttrs,
  ): IInspireTenantService.TenantDetailsResult;
}

export namespace IInspireTenantService {
  export type UserDetails = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    googleTenantId: any;
  };

  export type TenantDetails = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    logo: any;
    timezone: Timezone;
    languages: Languages;
    currencies: any[];
    agencies: Agencies;
  };

  type Settings = {
    teste: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Agencies = {
    id: string;
    name: string;
  };

  export type GetTenantUserDetailsInputAttrs = { accessToken: string };
  export type UserDetailsResult = Promise<UserDetails>;

  export type GetTenantDetailsInputAttrs = {
    accessToken: string;
    wrapperIntegrationId: string;
  };
  export type TenantDetailsResult = Promise<TenantDetails | Error>;
}
