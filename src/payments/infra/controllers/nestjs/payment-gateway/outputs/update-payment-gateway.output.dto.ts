import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdatePaymentGatewayOutputDto {
  @ApiProperty({ example: '55de07af-89d5-4f4a-b61b-c85c8c75897d' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isCalculatorAvailable: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  isCalculatorActive: boolean;
}
