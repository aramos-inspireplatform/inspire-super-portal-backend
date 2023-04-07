import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class UserTypesResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ name: 'name', description: 'The name of the user type' })
  name: string;

  @Expose()
  @ApiProperty({ name: 'slug', description: 'The slug of the user type' })
  slug: string;
}
