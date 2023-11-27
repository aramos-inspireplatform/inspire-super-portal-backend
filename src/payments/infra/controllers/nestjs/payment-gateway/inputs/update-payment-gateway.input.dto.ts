import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdatePaymentGatewayInputDto {
  @ApiProperty({ example: '1111-1111-1111', required: true })
  @IsString()
  tenantId: string;

  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  isCalculatorActive: boolean;
}
