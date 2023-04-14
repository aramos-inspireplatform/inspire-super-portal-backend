import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { RequestModules } from '~/shared/infra/database/entities';
import { BaseDto } from '~/shared/presentation/base.dto';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class GetRequestResponseDto extends BaseDto {
  @ApiProperty({ type: Tenant })
  @Expose()
  tenant: Tenant;

  @ApiProperty({ type: String })
  @Expose()
  createdByUserId: string;

  @ApiProperty({ type: String })
  @Expose()
  createdByUserEmail: string;

  @ApiProperty({ type: RequestStatus })
  @Expose()
  requestStatus: RequestStatus;

  @ApiProperty({ type: RequestModules, isArray: true })
  @Expose()
  requestModules: RequestModules[];
}
