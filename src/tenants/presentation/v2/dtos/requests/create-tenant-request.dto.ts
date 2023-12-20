import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
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

  @ApiProperty({ example: '8b49702a-a52f-4753-955a-336a4bd4714b' })
  @IsUUID()
  countryId: string;

  @ApiProperty({
    example: '62df0ea3-c220-48a2-ae55-e96ccfbfadd3',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  agencyId?: string;

  @ApiProperty({
    example: '890e08dc-a6f7-488f-86af-13be8909e296',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  timezoneId?: string;

  @ApiProperty({
    example: 'ecbe0ecd-5d89-4238-b4c3-260723f11378',
    required: false,
  })
  @IsUUID()
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
