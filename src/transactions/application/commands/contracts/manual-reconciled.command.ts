import { ManualReconciledStatusesEnum } from '~/transactions/domain/enums';

export interface IManualReconciledCommand {
  execute(
    input: IManualReconciledCommand.Input,
  ): Promise<IManualReconciledCommand.Output>;
}

export namespace IManualReconciledCommand {
  export type Input = {
    transactionId: string;
    accessToken: string;
    gTenantId: string;
    status: ManualReconciledStatusesEnum;
  };
  export type Output = void;
}
