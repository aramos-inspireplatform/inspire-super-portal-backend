import { MultipartFile } from '@fastify/multipart';

export interface IReconcileBexsCommand {
  execute(params: IReconcileBexsCommand.Input): IReconcileBexsCommand.Output;
}

export namespace IReconcileBexsCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    file: MultipartFile;
  };

  export type Output = Promise<void>;
}
