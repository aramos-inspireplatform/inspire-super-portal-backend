import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class ListUserResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'Jhon Doe' })
  name: string;

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
  @ApiProperty({ example: 'Active' })
  status: string;

  @Expose({ name: 'tenantId' })
  @ApiProperty({ example: 'teste-hnmkt', name: 'tenantId' })
  googleTenantId: string;

  @Expose()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ example: '6153611e2daa238fc1f67ac4' })
  phoneNumberCountryId: string;

  @Expose()
  @ApiProperty({ example: '21998989898' })
  phoneNumber: string;
}
