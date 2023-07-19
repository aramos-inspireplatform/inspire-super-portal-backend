import { MultipartFile } from '@fastify/multipart';

export namespace ReconcileBexsDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    file: MultipartFile;
  };

  export type Result = Promise<void>;
}
