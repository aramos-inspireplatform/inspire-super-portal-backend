import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class ModuleRequestStatus {
  @Expose()
  @ApiProperty({ example: 'aeb3862f-3b57-4eb2-8c59-6c88fdf615f6' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'any name for example' })
  name: string;
}

export class ModuleRequestType {
  @Expose()
  @ApiProperty({ example: 'ed3cd26c-91e2-41c1-8859-cc637ef1eda3' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'any name for example' })
  name: string;

  @Expose()
  @ApiProperty({ example: '64330429a19029aa893f0fb0' })
  wrapperIntegrationId: string;
}

export class Tenant {
  @Expose()
  @ApiProperty({ example: '34fa4288-d0ab-48e5-b930-4eef92829312' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'any name for example' })
  name: string;

  @Expose()
  @ApiProperty({ example: '64330429a19029aa893f0fb0' })
  wrapperIntegrationId: string;

  @Expose()
  @ApiProperty({ example: '' })
  createdByUserId: string;
}

export class CreateModuleRequestResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'eea5f578-e08e-423b-bef0-35d066e776b0' })
  id: string;

  @Expose()
  @ApiProperty({ example: 0 })
  attempts: number;

  @Expose()
  @ApiProperty({ example: { key: 'value' } })
  requestSettings: any;

  @Expose()
  @ApiProperty({ example: ModuleRequestStatus })
  moduleRequestStatus: ModuleRequestStatus;

  @Expose()
  @ApiProperty({ example: ModuleRequestType })
  moduleRequestType: ModuleRequestType;

  @Expose()
  @ApiProperty({ example: Tenant })
  tenant: Tenant;
}
