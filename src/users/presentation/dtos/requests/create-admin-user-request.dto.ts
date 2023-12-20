import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdminUserRequestDto {
  @ApiProperty({
    type: String,
    example: 'Jhon',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'DR.',
    required: false,
  })
  @IsString()
  @MaxLength(10)
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'jhon@doe.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    type: String,
    example: '+55 21 99898-9898',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: '432c58ad-d5f5-4914-8968-51de0bf6b4d5',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userTypeId: string;

  @ApiProperty({
    example: ['62df0ea3-c220-48a2-ae55-e96ccfbfadd3'],
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { each: true })
  agencies?: string[];

  @ApiProperty({
    example: '8b49702a-a52f-4753-955a-336a4bd4714b',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  phoneNumberCountryId?: string;
}
