import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTenantAdminUserRequestBodyDto {
  @ApiProperty({
    type: String,
    example: 'Jhon',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(350)
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
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
  @MaxLength(300)
  email: string;

  @ApiProperty({
    type: String,
    example: '+55 21 99898-9898',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: '61b0dbd5ec727212cd6e2e21', required: false })
  @IsOptional()
  @IsMongoId()
  userTypeId: string;

  @ApiProperty({ example: ['61b0dbd5ec727249cd6e2e24'], required: false })
  @IsOptional()
  @IsMongoId({ each: true })
  agencies?: string[];
}
