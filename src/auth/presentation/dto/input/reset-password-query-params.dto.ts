import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordPayloadQueryParamsDto {
  @ApiProperty({
    name: 'securityToken',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  securityToken: string;
}
