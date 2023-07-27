import { MultipartFile } from '@fastify/multipart';

export interface IReconciliateBexsCommand {
  execute(
    params: IReconciliateBexsCommand.Input,
  ): IReconciliateBexsCommand.Output;
}

export namespace IReconciliateBexsCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    file: MultipartFile;
  };

  export type Output = Promise<void>;
}
