import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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

export class CreateTenantRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z][a-zA-Z0-9-]+$/, {
    message:
      'name Should start with a letter and only consist of letters, digits and hyphens.',
  })
  @MaxLength(300)
  @MinLength(2)
  @ApiProperty({ example: 'dontknow' })
  name: string;

  @ApiProperty({ example: 'dontknow Test' })
  @MaxLength(300)
  @MinLength(2)
  @IsNotEmpty()
  accountName: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'description' })
  slug: string;

  @ApiPropertyOptional({
    example: { test: 'test' },
  })
  @IsObject()
  @IsOptional()
  settings?: Record<string, any>;

  @ApiProperty({ example: '614ce3cfc4e9775f5a6dc5a9' })
  @IsMongoId()
  countryId: string;

  @ApiProperty({ example: '614ce3cfc4e9775f5a6dc5a7', required: false })
  @IsMongoId()
  @IsOptional()
  agencyId?: string;

  @ApiProperty({ example: '614ce3cfc4e9775f5a6dc5a8', required: false })
  @IsMongoId()
  @IsOptional()
  timezoneId?: string;

  @ApiProperty({ example: '614ce3cfc4e9775f5a6dc5a8', required: false })
  @IsMongoId()
  @IsOptional()
  languageId?: string;

  @ApiProperty({ example: '30', required: true })
  @IsNumber()
  termsRecurringIntervalCount: number;

  @ApiProperty({
    example: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd',
    required: true,
  })
  @IsNotEmpty()
  termsRecurringIntervalId: string;

  @ApiProperty({
    example: {
      discountPercentage: 10,
      paymentMethodIds: [
        'cd44a946-bfdd-4370-b2cc-1b3f0df311fd',
        'af44a946-bfdd-4370-b2cc-1b3f0df311jg',
      ],
    },
    required: true,
  })
  @IsOptional()
  dualPricing?: {
    discountPercentage: number;
    paymentMethodIds: string[];
  };
}
