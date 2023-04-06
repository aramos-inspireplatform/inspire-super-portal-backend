import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class UserResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'Jhon' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'Dr.' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '+55 21 99898-9898' })
  phoneNumber: string;

  @Expose({ name: 'tenantId' })
  @ApiProperty({ example: 'teste-hnmkt', name: 'tenantId' })
  googleTenantId: string;
}
