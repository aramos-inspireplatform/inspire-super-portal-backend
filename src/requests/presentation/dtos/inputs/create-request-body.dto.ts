import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';
import { CreateModuleRequestBodyDto } from '~/modules-requests/presentation/dto/input/create-module-request.dto';

export class CreateRequestBodyDto {
  @ApiProperty({
    example: 'e6c846a8-fc6c-43ee-9239-345c6033e22a',
  })
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @ApiProperty({
    type: CreateModuleRequestBodyDto,
    isArray: true,
    example: CreateModuleRequestBodyDto,
  })
  @IsNotEmpty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateModuleRequestBodyDto)
  moduleRequests: CreateModuleRequestBodyDto[];
}
