import { Module } from '~/requests/domain/entities/module.entity';

export interface IInspireTenantService {
  getTenantJwtTokenUserDetails(
    attrs: IInspireTenantService.GetTenantUserDetailsInputAttrs,
  ): IInspireTenantService.UserDetailsResult;

  getTenantDetails(
    attrs: IInspireTenantService.GetTenantDetailsInputAttrs,
  ): IInspireTenantService.TenantDetailsResult;

  linkTenantModule(attrs: {
    moduleType: Module;
    attrs: {
      accessToken: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
    };
  }): Promise<void>;

  getTenantAndUserDetails(attrs: {
    tenantWrapperIntegrationId: string;
    accessToken: string;
  }): Promise<{
    tenant: IInspireTenantService.TenantDetails;
    user: IInspireTenantService.TenantUserUserDetails;
  }>;
}

export namespace IInspireTenantService {
  export type TenantUserUserDetails = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    status: string;
    adminBlockedDate: any;
    createdAt: string;
    phoneNumber: string;
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
  export type UserDetailsResult = Promise<TenantUserUserDetails>;

  export type GetTenantDetailsInputAttrs = {
    accessToken: string;
    wrapperIntegrationId: string;
  };
  export type TenantDetailsResult = Promise<TenantDetails | Error>;
}
