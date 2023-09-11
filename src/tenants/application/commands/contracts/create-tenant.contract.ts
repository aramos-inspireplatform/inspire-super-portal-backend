export interface ICreateTenantCommand {
  execute(params: ICreateTenantCommand.Input): ICreateTenantCommand.Output;
}

export namespace ICreateTenantCommand {
  export type Input = {
    accessToken: string;
    currentUserId: string;
    currentUserEmail: string;
    tenant: {
      name: string;
      accountName: string;
      slug: string;
      countryId: string;
      settings?: Settings;
      agencyId?: string;
      timezoneId?: string;
      languageId?: string;
      termsRecurringIntervalCount?: number;
      termsRecurringIntervalId?: string;
      dualPricing?: {
        discountAmount: number;
        paymentMethodIds: string[];
      };
    };
  };

  export type Output = Promise<{
    id: string;
    name: string;
    slug: string;
    gTenantId: string;
    logo: string;
    accountName: string;
    publicBusinessName: string;
    dualPricingPercentage: number;
    isDualPricingActive: boolean;
  }>;

  // Additional types
  type Settings = { [property: string]: any };
}
