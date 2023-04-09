import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { GetTenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';

export class PaginatedTenantsResponseDto extends PaginatedResultsDto<GetTenantResponseDto> {
  @ApiProperty({
    type: GetTenantResponseDto,
    isArray: true,
  })
  rows: GetTenantResponseDto[];
}
