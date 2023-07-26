import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';

export class FindAllPayoutPaymentsPagedInputDto extends CommonPaginateDto {
  @ApiProperty({
    example: 'teste-hnmkt',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;
}
