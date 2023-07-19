import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsString,
  IsNumber,
  MaxLength,
  Min,
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
  @Min(0.1)
  amount: number;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  note: string;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  description: string;

  @ApiProperty({ example: '2023-06-01' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
