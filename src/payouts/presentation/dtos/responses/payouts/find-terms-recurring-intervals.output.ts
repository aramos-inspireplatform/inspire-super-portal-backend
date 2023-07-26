import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindTermsRecurringIntervalsOutput extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Daily',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'day',
  })
  interval: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;
}
