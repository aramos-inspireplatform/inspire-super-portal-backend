export namespace UpdateProductPriceDto {
  export type InputAttrs = {
    accessToken: string;
    tenant: string;
    percentage: number;
  };

  export type Response = {
    numberOfProductPricesUpdated: number;
  };

  export type Result = Promise<Response>;
}
