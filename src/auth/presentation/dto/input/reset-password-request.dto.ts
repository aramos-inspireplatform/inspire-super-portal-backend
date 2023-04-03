import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordPayloadRequestBodyDto {
  @ApiProperty({ type: String, example: 'john.doe@inspire.to' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
