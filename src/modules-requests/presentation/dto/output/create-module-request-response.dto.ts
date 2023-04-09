import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/shared/presentation/base.dto';

export class ModuleRequestStatus {
  @ApiProperty({ example: 'aeb3862f-3b57-4eb2-8c59-6c88fdf615f6' })
  id: string;

  @ApiProperty({ example: 'any name for example' })
  name: string;
}

export class ModuleRequestType {
  @ApiProperty({ example: 'ed3cd26c-91e2-41c1-8859-cc637ef1eda3' })
  id: string;

  @ApiProperty({ example: 'any name for example' })
  name: string;

  @ApiProperty({ example: '64330429a19029aa893f0fb0' })
  wrapperIntegrationId: string;
}

export class Tenant {
  @ApiProperty({ example: '34fa4288-d0ab-48e5-b930-4eef92829312' })
  id: string;

  @ApiProperty({ example: 'any name for example' })
  name: string;

  @ApiProperty({ example: '64330429a19029aa893f0fb0' })
  wrapperIntegrationId: string;

  @ApiProperty({ example: '' })
  createdByUserId: string;
}

export class CreateModuleRequestResponseDto extends BaseDto {
  @ApiProperty({ example: 'eea5f578-e08e-423b-bef0-35d066e776b0' })
  id: string;

  @ApiProperty({ example: 0 })
  attempts: number;

  @ApiProperty({ example: { key: 'value' } })
  requestSettings: any;

  @ApiProperty({ example: ModuleRequestStatus })
  moduleRequestStatus: ModuleRequestStatus;

  @ApiProperty({ example: ModuleRequestType })
  moduleRequestType: ModuleRequestType;

  @ApiProperty({ example: Tenant })
  tenant: Tenant;
}
