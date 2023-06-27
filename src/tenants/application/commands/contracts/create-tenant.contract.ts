export interface ICreateTenantCommand {
  execute(params: ICreateTenantCommand.Input): ICreateTenantCommand.Output;
}

export namespace ICreateTenantCommand {
  export type Input = {
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

  export type Output = Promise<{
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    logo: any;
    accountName: string;
    publicBusinessName: any;
    // supportEmail: any;
    // supportPhoneNumber: any;
    // showPhoneOnInvoiceAndReceipt: boolean;
    // statementDescriptor: any;
    // shortenedDescriptor: any;
    // businessWebsite: any;
    // supportWebsite: any;
    // privacyPolicy: any;
    // termsOfService: any;
    // timezone: Timezone;
    // languages: Languages;
    // currencies: any[];
    // countries: Countries;
    // userEmail: string;
  }>;
  //export type TenantRouteResponse = InspireHttpResponse<CreatedTenant>;

  // Additional types
  type Settings = { [property: string]: Settings };

  export type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  export type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  export type Countries = {
    id: string;
    name: string;
  };
}
