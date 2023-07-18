import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreatePayoutAdjustmentFeeInputDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
  })
  @IsNotEmpty()
  @IsUUID()
  adjustmentTypeId: string;

  @ApiProperty({ example: 5.32 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2023-06-01' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
