export interface IFindTenantQuery {
  execute(params: IFindTenantQuery.Input): IFindTenantQuery.Output;
}

export namespace IFindTenantQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
  };

  export type Output = Promise<{
    id: string;
    name: string;
    slug: string;
    gTenantId: string;
    logo: string;
    accountName: string;
    publicBusinessName: string;
    createdAt: Date;
    agency: Agency;
    timezone: Timezone;
    language: Language;
    country: Country;
    status: Status;
    termsRecurringIntervalCount: number;
    termsRecurringInterval: TermsRecurringInterval;
    createdBy: CreatedBy;
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
