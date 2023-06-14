import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetProcessorResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'Bexs' })
  name: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: 'e273ad87-988e-4051-9d76-5f756cee4923' })
  integrationCode: string;
}
