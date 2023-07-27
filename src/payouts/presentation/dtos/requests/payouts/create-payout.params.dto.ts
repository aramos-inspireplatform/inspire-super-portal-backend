import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreatePayoutParamsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  payoutId: string;
}
