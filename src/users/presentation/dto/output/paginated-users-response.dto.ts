import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';
import { FindAllAdminUsersResponseDto } from './find-all-admin-users-response.dto';

export class PaginatedUsersResponseDto extends PaginatedResultsDto<FindAllAdminUsersResponseDto> {
  @ApiProperty({
    type: UserResponseDto,
    isArray: true,
  })
  rows: FindAllAdminUsersResponseDto[];
}
