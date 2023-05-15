import { ApiProperty } from '@nestjs/swagger';
import { CommonPaginateDto } from '../../../../shared/presentation/common-paginated.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class ListTenantUsersFilterDto extends CommonPaginateDto {
  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  tenantId?: string;
}
