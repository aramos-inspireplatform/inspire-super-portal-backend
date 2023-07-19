export namespace ReconcileBexsDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    filename: string;
    buffer: Buffer;
  };

  export type Result = Promise<boolean>;
}
