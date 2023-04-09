import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { GetVaultsResponseDto } from '~/vaults/presentation/dto/output/get-vaults.dto';

export class PaginatedVaultsResponseDto extends PaginatedResultsDto<GetVaultsResponseDto> {
  @ApiProperty({
    type: GetVaultsResponseDto,
    isArray: true,
  })
  rows: GetVaultsResponseDto[];
}
