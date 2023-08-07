import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetTermsRecurringIntervalDto extends BaseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd',
  })
  uuid: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Daily',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'day',
  })
  interval: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;
}
