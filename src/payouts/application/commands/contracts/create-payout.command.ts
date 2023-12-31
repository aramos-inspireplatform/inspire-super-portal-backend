import { CreatePayoutCommandType } from '~/payouts/domain/enums';

export interface ICreatePayoutCommand {
  execute(
    input: ICreatePayoutCommand.Input,
  ): Promise<ICreatePayoutCommand.Output>;
}

export namespace ICreatePayoutCommand {
  type AdjustmentFee = {
    id?: string;
    adjustmentTypeId: string;
    amount: number;
    description: string;
    note: string;
    date: Date;
  };

  export type Input = {
    accessToken: string;
    gTenantId: string;
    payoutId?: string;
    command: CreatePayoutCommandType;
    periodStartDate: Date;
    periodEndDate: Date;
    selectedPayments: string[];
    adjustmentFees: AdjustmentFee[];
    selectAllPayments: boolean;
    settlementCurrencyIsoCode: string;
  };
  export type Output = { id: string };
}
