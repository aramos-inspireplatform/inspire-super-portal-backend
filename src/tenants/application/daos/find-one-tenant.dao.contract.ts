export interface IFindOneTenantDao {
  execute(params: IFindOneTenantDao.Input): IFindOneTenantDao.Output;
}

export namespace IFindOneTenantDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
  };

  export type Output = Promise<{
    id: string;
    uuid: string;
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
    termsRecurringIntervalCount: number;
    termsRecurringInterval: TermsRecurringInterval;
    createdBy: CreatedBy;
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

  type TermsRecurringInterval = {
    uuid: string;
    name: string;
    interval: string;
    isActive: boolean;
  };

  type CreatedBy = {
    firstName: string;
    lastName: string;
  };

  type Settings = { [property: string]: any };
}
