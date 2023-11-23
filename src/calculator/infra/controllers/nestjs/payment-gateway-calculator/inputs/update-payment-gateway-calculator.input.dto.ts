import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdatePaymentGatewayCalculatorInputDto {
  @ApiProperty({ example: '1111-1111-1111', required: true })
  @IsString()
  @IsUUID()
  paymentGatewayId: string;

  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  isEnable: boolean;
}
