import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdatePaymentGatewayCalculatorOutputDto {
  @ApiProperty({ example: '55de07af-89d5-4f4a-b61b-c85c8c75897d' })
  @IsString()
  @IsUUID()
  paymentGatewayId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isEnable: boolean;
}
