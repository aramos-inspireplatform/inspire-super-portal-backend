import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { RequestModulesResponseBodyDto } from '~/requests/presentation/dtos/responses/request-modules-response-body.dto';
import { RequestModules } from '~/shared/infra/database/entities';
import { BaseDto } from '~/shared/presentation/base.dto';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

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

  @ApiProperty({ type: RequestModulesResponseBodyDto, isArray: true })
  @Expose()
  @Type(() => RequestModulesResponseBodyDto)
  requestModules: RequestModules[];
}
