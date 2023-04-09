import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsUrl } from 'class-validator';

export class WebHookDto {
  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsString()
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
