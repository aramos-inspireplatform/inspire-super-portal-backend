import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetUserTypesDto extends BaseDto {
  @Expose()
  @ApiProperty({ name: 'name', description: 'The name of the user type' })
  name: string;

  @Expose()
  @ApiProperty({ name: 'slug', description: 'The slug of the user type' })
  slug: string;
}

export class GetAgencyDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'Agency name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'http://logo' })
  logo: string;
}

export class GetAdminUserDetailsDto extends BaseDto {
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

  @Expose()
  @ApiProperty({ example: '2023-04-06T00:31:02.465Z', nullable: true })
  adminBlockedDate: Date;

  @Expose()
  @ApiProperty({ example: 'teste-7c0ze' })
  googleTenantId: string;

  @Expose()
  @ApiProperty({ example: false, type: Boolean })
  isSsoUser: boolean;

  @Expose()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ example: GetUserTypesDto })
  @Type(() => GetUserTypesDto)
  userTypeId: GetUserTypesDto;

  @Expose()
  @ApiProperty({ example: '6153611e2daa238fc1f67ac4' })
  phoneNumberCountryId: string;

  @Expose()
  @ApiProperty({ example: '21998989898' })
  phoneNumber: string;

  @Expose()
  @ApiProperty({ example: 0 })
  agencyCount: string;

  @Expose({ name: 'userType' })
  @ApiProperty({ example: 'system_admin' })
  getUserType() {
    return this.userTypeId?.slug;
  }

  @Expose()
  @ApiProperty({ example: GetAgencyDto, isArray: true })
  @Type(() => GetAgencyDto)
  agencies: GetAgencyDto[];
}
