export namespace InspireTenantApiServiceDto {
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
    name: string;
    slug: string;
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
  export type FindAllResult = Promise<Tenants>;

  // FindOne
  export type FindOneInputAttrs = {
    accessToken: string;
    gTenantId: string;
  };
  export type FindOneResult = Promise<Tenant | Error>;

  // Create
  export type CreateInputAttrs = {
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
    };
  };
  export type CreateResult = Promise<Tenant | Error>;

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
