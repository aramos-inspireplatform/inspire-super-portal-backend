import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { BaseDto } from '~/shared/presentation/base.dto';

export class CreatePayoutOutputDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: '74deb067-2bf6-45b1-991d-a0f22ab0ae3a',
  })
  @IsUUID()
  id: string;
}
