import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CommonPaginateDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 0;

  @ApiPropertyOptional({ type: Number, example: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pagesize = 10;

  @ApiPropertyOptional({ example: 'name' })
  @IsOptional()
  @IsString()
  sortby?: string;

  @ApiPropertyOptional({ example: 'search text' })
  @IsOptional()
  @IsString()
  keywords?: string;
}
