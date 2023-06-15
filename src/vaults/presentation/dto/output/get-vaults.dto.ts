import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetVaultsResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Vault Name',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: true,
  })
  isActive: string;

  @Expose()
  @ApiProperty({
    example: '5b3ffe96-bfc2-4b5b-b323-558621f0ea16',
  })
  integrationCode: string;
}
