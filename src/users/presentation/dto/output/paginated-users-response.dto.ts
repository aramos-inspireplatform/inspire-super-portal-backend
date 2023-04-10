import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';
import { ListUserResponseDto } from './list-user-response.dto';

export class PaginatedUsersResponseDto extends PaginatedResultsDto<ListUserResponseDto> {
  @ApiProperty({
    type: UserResponseDto,
    isArray: true,
  })
  rows: ListUserResponseDto[];
}
