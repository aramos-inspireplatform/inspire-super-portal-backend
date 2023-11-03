import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateDualPriceTenantRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsObject()
  settings?: Object;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsString()
  agencyId?: string;

  @IsOptional()
  @IsString()
  timezoneId?: string;

  @IsOptional()
  @IsString()
  languageId?: string;

  @IsOptional()
  @IsNumber()
  termsRecurringIntervalCount?: number;

  @IsOptional()
  @IsString()
  termsRecurringIntervalId?: string;

  @IsOptional()
  @IsBoolean()
  isDualPricingActive?: boolean;

  @IsOptional()
  @IsNumber()
  dualPricingPercentage?: number;
}
