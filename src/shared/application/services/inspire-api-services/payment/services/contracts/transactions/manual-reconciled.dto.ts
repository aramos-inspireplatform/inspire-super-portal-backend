import { ManualReconciledStatusesEnum } from '~/transactions/domain/enums';

export namespace ManualReconciledDto {
  export type InputAttrs = {
    transactionId: string;
    status: ManualReconciledStatusesEnum;
    accessToken: string;
    gTenantId: string;
  };

  export type Result = Promise<void>;
}
