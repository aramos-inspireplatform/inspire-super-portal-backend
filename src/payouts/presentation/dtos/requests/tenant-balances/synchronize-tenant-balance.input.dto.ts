import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class SynchronizeTenantBalanceInputDto {
  @ApiProperty({
    example: '6ce3fc77-ef0a-4ab2-af10-f7463dac27dd',
    description: 'The unique identifier.',
  })
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @ApiProperty({
    example: 'test-hmnkt',
    description: 'The unique schema identifier.',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({
    example: 'Test',
    description: 'The tenant name.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'fe716c91-e6bc-4231-a361-81c4696daac8',
    description: 'The agency unique identifier.',
  })
  @IsNotEmpty()
  @IsUUID()
  agencyId: string;

  @ApiProperty({
    example: 'Agency',
    description: 'The agency name.',
  })
  @IsNotEmpty()
  @IsString()
  agencyName: string;

  @ApiProperty({
    example: 'a217e218-a723-4659-8f3d-9f218310655b',
    description: 'The tenant status unique identifier.',
  })
  @IsNotEmpty()
  @IsUUID()
  tenantStatusId: string;

  @ApiProperty({
    example: 30,
    description: 'The terms recurring interval count.',
  })
  @IsNotEmpty()
  @IsNumber()
  termsRecurringIntervalCount: number;

  @ApiProperty({
    example: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd',
    description: 'The terms recurring interval unique identifier.',
  })
  @IsNotEmpty()
  @IsUUID()
  termsRecurringIntervalId: string;
}
