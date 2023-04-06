import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenPayloadRequestBodyDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
