export namespace UpdateTenantConfigurationsDto {
  export type InputAttrs = {
    accessToken: string;
    tenant: string;
    dualPricingPercentage: number;
    isDualPricingActive: boolean;
  };

  export type Response = Array<{
    numberOfProductPricesUpdated: number;
    numberOfPaymentLinksUpdated: number;
    numberOfProductPricesArchived: number;
  }>;

  export type Result = Promise<Response>;
}
