import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { TenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';

export class TenantListResponseDto extends PaginatedResultsDto<TenantResponseDto> {
  @ApiProperty({
    type: TenantResponseDto,
    isArray: true,
  })
  rows: TenantResponseDto[];
}
