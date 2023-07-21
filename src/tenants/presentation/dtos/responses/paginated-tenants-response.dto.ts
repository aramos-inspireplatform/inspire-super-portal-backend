import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { TenantsDto } from './tenants.dto';

export class PaginatedTenantsResponseDto extends PaginatedResultsDto<TenantsDto> {
  @ApiProperty({
    type: TenantsDto,
    isArray: true,
  })
  rows: TenantsDto[];
}
