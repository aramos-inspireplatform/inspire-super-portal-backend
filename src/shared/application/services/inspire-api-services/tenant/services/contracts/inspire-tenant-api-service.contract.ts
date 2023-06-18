import { Module } from '~/requests/domain/entities/module.entity';
import { TenantListResponseDto } from '~/tenants/presentation/dto/output/tenant-list-response.dto';

export interface IInspireTenantApiService {
  findAll(
    attrs: IInspireTenantApiService.FindAllInputAttrs,
  ): IInspireTenantApiService.FindAllResult;

  findOne(
    attrs: IInspireTenantApiService.FindOneInputAttrs,
  ): IInspireTenantApiService.FindOneResult;

  // Deprecated below ----------------------------

  getTenantJwtTokenUserDetails(
    attrs: IInspireTenantApiService.GetTenantUserDetailsInputAttrs,
  ): IInspireTenantApiService.UserDetailsResult;

  getTenantDetails(
    attrs: IInspireTenantApiService.GetTenantDetailsInputAttrs,
  ): IInspireTenantApiService.TenantDetailsResult;

  linkTenantModule(attrs: {
    module: Module;
    attrs: {
      tenantIntegrationKey: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
      name: string;
      slug: string;
    };
  }): Promise<void>;

  getTenantAndUserDetails(attrs: {
    tenantIntegrationKey: string;
    googleTenantId: string;
  }): Promise<IInspireTenantApiService.TenantDetails>;
}

export namespace IInspireTenantApiService {
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

  export type FindAllInputAttrs = {
    accessToken: string;
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };
  export type FindAllResult = Promise<TenantListResponseDto>;

  export type FindOneInputAttrs = {
    accessToken: string;
    integrationCode: string;
  };
  export type FindOneResult = Promise<TenantDetails | Error>;

  // Deprecated below ----------------------------

  export type GetTenantUserDetailsInputAttrs = { accessToken: string };
  export type UserDetailsResult = Promise<TenantUserUserDetails>;

  export type GetTenantDetailsInputAttrs = {
    integrationCode: string;
  };
  export type TenantDetailsResult = Promise<TenantDetails | Error>;
}
