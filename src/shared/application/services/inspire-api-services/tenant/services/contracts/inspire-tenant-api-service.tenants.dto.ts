export namespace InspireTenantApiServiceTenantsDto {
  export type Tenants = {
    rows: Tenant[];
    count: number;
    page: number;
    pageSize: number;
    pageCount: number;
    pageNumberIsGood: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    numberOfFirstItemOnPage: 0;
    firstItemOnPage: number;
    numberOfLastItemOnPage: number;
    lastItemOnPage: number;
  };

  export type Tenant = {
    id: string;
    uuid: string;
    name: string;
    slug: string;
    googleTenantId: string;
    accountName: string;
    settings: Record<string, any>;
    logo: string;
    publicBusinessName: string;
    supportEmail: string;
    supportPhoneNumber: string;
    showPhoneOnInvoiceAndReceipt?: boolean;
    supportAddress?: SupportAddress;
    statementDescriptor: string;
    shortenedDescriptor: string;
    businessWebsite: string;
    supportWebsite: string;
    privacyPolicy: string;
    termsOfService: string;
    createdAt: Date;
    timezone: Timezone;
    language: Language;
    currency: Currency;
    currencies: Currency[];
    agency: Agency;
    country: Country;
    status: TenantStatus;
    termsRecurringIntervalCount: number;
    termsRecurringInterval: TermsRecurringInterval;
    createdBy: CreatedBy;
    isDualPricingActive: boolean;
    dualPricingPercentage: number;
  };

  export type SupportAddress = {
    id: string;
    countries: Country;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
  };

  export type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
    isDefault: boolean;
  };

  export type Language = {
    id: string;
    name: string;
    isoCode: string;
    isDefault: boolean;
    isActive: boolean;
  };

  export type Currency = {
    id: string;
    name: string;
    symbol: string;
    isoCode: string;
    isDefault: boolean;
    isActive: boolean;
  };

  export type Agency = {
    id: string;
    uuid: string;
    name: string;
    logo: string;
  };

  export type Country = {
    id: string;
    name: string;
    nativeName: string;
    code: string;
    flagSvgUrl: string;
    dialCode: string;
    isActive: boolean;
  };

  export type TenantStatus = {
    id: string;
    uuid: string;
    name: string;
    slug: string;
  };

  type TermsRecurringInterval = {
    uuid: string;
    name: string;
    interval: string;
    isActive: boolean;
    id?: string;
  };

  type CreatedBy = {
    firstName: string;
    lastName: string;
  };

  // FindAll
  export type FindAllInputAttrs = {
    accessToken: string;
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };
  export type FindAllTenantsResult = Promise<Tenants>;

  // FindOneTenant
  export type FindOneTenantInputAttrs = {
    accessToken: string;
    gTenantId: string;
  };
  export type FindOneTenantResult = Promise<Tenant | Error>;

  // CreateTenant
  export type CreateTenantInputAttrs = {
    accessToken: string;
    currentUser: string;
    tenant: {
      name: string;
      accountName: string;
      slug: string;
      countryId: string;
      settings?: Settings;
      agencyId?: string;
      timezoneId?: string;
      languageId?: string;
      termsRecurringIntervalCount: number;
      termsRecurringIntervalId: string;
      isDualPricingActive: boolean;
      dualPricingPercentage: number;
    };
  };
  export type CreateTenantResult = Promise<Tenant | Error>;

  // FindOneAdminUser
  export type FindOneAdminUserInputAttrs = {
    accessToken: string;
  };
  export type FindOneAdminUserResult = Promise<Tenant | Error>;

  // UpdateTenant
  export type UpdateTenantInputAttrs = {
    accessToken: string;
    tenant: string;
    id: string;
    body?: Object | UpdateTenantBodyAttr;
  };

  export type UpdateTenantBodyAttr = {
    name?: string;
    accountName?: string;
    slug?: string;
    settings?: Object;
    countryId?: string;
    agencyId?: string;
    timezoneId?: string;
    languageId?: string;
    termsRecurringIntervalCount?: number;
    termsRecurringIntervalId?: string;
    isDualPricingActive?: boolean;
    dualPricingPercentage?: number;
  };

  export type UpdateTenantResult = Promise<Tenant | Error>;

  // Deprecated below ------------------------------------------------
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
    uuid: string;
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

  export type Settings = { [property: string]: Settings };

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
    integrationCode: string;
  };
  export type TenantDetailsResult = Promise<TenantDetails | Error>;
}
