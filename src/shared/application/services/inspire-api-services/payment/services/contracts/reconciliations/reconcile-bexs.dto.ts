export namespace ReconciliateBexsDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    buffer: Buffer;
  };

  export type Result = Promise<boolean>;
}
