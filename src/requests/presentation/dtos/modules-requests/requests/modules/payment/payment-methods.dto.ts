import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsObject } from 'class-validator';

export class PaymentMethodsDto {
  @ApiProperty({
    required: true,
    example: 'd3e90739-d82e-417a-a0fd-307e706afcb1',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ type: Object, required: true })
  @IsNotEmpty()
  @IsObject()
  settings: object;
}
