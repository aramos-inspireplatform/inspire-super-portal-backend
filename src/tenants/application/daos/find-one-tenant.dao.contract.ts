export interface IFindTenantDao {
  execute(params: IFindTenantDao.Input): IFindTenantDao.Output;
}

export namespace IFindTenantDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
  };

  export type Output = Promise<{
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    logo: string;
    accountName: string;
    publicBusinessName: string;
    supportEmail: string;
    supportPhoneNumber: string;
    showPhoneOnInvoiceAndReceipt: boolean;
    statementDescriptor: string;
    shortenedDescriptor: string;
    businessWebsite: string;
    supportWebsite: string;
    privacyPolicy: string;
    termsOfService: string;
    createdAt: Date;
    agency: Agency;
    timezone: Timezone;
    language: Language;
    currencies: Currency[];
    country: Country;
    status: Status;
    settings: Settings;
  }>;

  // Additional types
  type Agency = {
    id: string;
    name: string;
    logo: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Language = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Currency = {
    id: string;
    name: string;
    symbol: string;
    isoCode: string;
    isDefault: boolean;
    isActive: boolean;
  };

  type Country = {
    id: string;
    name: string;
    code: string;
    flagSvgUrl: string;
  };

  type Status = {
    id: string;
    name: string;
    slug: string;
  };

  type Settings = { [property: string]: any };
}
