import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTenantUserRequestDto {
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

  @ApiProperty({
    type: String,
    example: 'myPassword123*',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    type: String,
    example: 'myPassword123*',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'confirmationPassword too weak',
  })
  confirmationPassword: string;

  @ApiProperty({
    example: 'teste-hnmkt',
    required: false,
    description: 'The old googleTenantId now will be called as tenantId',
  })
  @IsString()
  tenantId: string;
}
