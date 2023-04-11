import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { ListTenantsResponseDto } from './list-tenant-response.dto';

export class PaginatedTenantsResponseDto extends PaginatedResultsDto<ListTenantsResponseDto> {
  @ApiProperty({
    type: ListTenantsResponseDto,
    isArray: true,
  })
  rows: ListTenantsResponseDto[];
}
