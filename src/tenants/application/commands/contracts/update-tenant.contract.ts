export interface IUpdateTenantCommand {
  execute(params: IUpdateTenantCommand.Input): IUpdateTenantCommand.Output;
}

export namespace IUpdateTenantCommand {
  export type Input = {
    accessToken: string;
    tenantId: string;
    body: {
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

  export type Output = Promise<{
    code: number;
    message: string;
  }>;

  export type Response = {
    code: number;
    message: string;
    updatedTenant: Object;
    updatedProductPrices?: number;
    updatedPaymentLinks?: number;
    archivedProductPrices?: number;
  };
}
