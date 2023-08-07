import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '../../../../shared/presentation/base.dto';
export class PayoutStatusesDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Processed',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'processed',
  })
  slug: string;
}
