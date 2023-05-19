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
      tenantIntegrationKey: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
    };
  }): Promise<void>;

  getTenantAndUserDetails(attrs: {
    tenantIntegrationKey: string;
    googleTenantId: string;
  }): Promise<IInspireTenantService.TenantDetails>;
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
    _id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    timezoneId: TimezoneId;
    languageId: LanguageId;
    currencyId: string;
    agencyId: AgencyId;
    logoUploadedAt1: string;
    id: string;
    logo: any;
    firstUserEmail: string;
  };

  export type Settings = {
    teste: string;
  };

  export type TimezoneId = {
    _id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
    id: string;
  };

  export type LanguageId = {
    _id: string;
    name: string;
    isoCode: string;
    id: string;
  };

  export type AgencyId = {
    _id: string;
    name: string;
    logo: string;
    id: string;
  };

  export type GetTenantUserDetailsInputAttrs = { accessToken: string };
  export type UserDetailsResult = Promise<TenantUserUserDetails>;

  export type GetTenantDetailsInputAttrs = {
    wrapperIntegrationId: string;
  };
  export type TenantDetailsResult = Promise<TenantDetails | Error>;
}
