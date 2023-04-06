import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetCountryResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'United States dollar',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'United States dollar',
  })
  nativeName: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'BR',
  })
  code: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'https://test',
  })
  flagSvgUrl: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'https://test',
  })
  dialCode: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;
}
