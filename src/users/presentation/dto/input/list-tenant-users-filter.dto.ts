import { ApiProperty } from '@nestjs/swagger';
import { CommonPaginateDto } from '../../../../shared/presentation/common-paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class ListTenantUsersFilterDto extends CommonPaginateDto {
  @ApiProperty({ example: 'teste-hnmkt', required: false })
  @IsString()
  @IsOptional()
  tenantId?: string;
}
