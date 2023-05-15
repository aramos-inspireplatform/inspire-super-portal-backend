import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetLanguageResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'English - United States',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'en-US',
  })
  isoCode: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isDefault: boolean;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;
}
