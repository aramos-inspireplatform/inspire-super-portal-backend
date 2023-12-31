import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class FindAllAdminUsersResponseDto extends BaseDto {
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
  @ApiProperty({ example: false, type: Boolean })
  isActive: boolean;

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

  @Expose({ name: 'userType' })
  @ApiProperty({ example: 'system_admin' })
  userType: string;

  @Expose()
  @ApiProperty({ example: '2023-04-06T00:31:02.465Z', nullable: true })
  adminBlockedDate: Date;

  @Expose()
  @ApiProperty({ example: 0 })
  agencyCount: string;
}
