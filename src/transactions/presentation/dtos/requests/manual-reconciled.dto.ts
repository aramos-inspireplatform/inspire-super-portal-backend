import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ManualReconciledStatusesEnum } from '~/transactions/domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export namespace ManualReconciledDto {
  export class Params {
    @ApiProperty({
      example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
      required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    transactionId: string;

    @ApiProperty({ enum: ManualReconciledStatusesEnum })
    @IsNotEmpty()
    @IsEnum(ManualReconciledStatusesEnum)
    status: ManualReconciledStatusesEnum;
  }

  export class Body {
    @ApiProperty({
      example: 'teste-hnmkt',
    })
    @IsNotEmpty()
    @IsString()
    gTenantId: string;
  }
}
