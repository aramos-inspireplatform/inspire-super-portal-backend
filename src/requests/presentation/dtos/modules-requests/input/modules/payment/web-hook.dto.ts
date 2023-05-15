import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsUrl } from 'class-validator';

export class WebHookDto {
  @ApiProperty({
    required: true,
    example: 'https://www.gooogle.com',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
