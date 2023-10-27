import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { CreateRequestBodyDto } from '~/requests/presentation/dtos/requests/create-request-body.dto';
import { CreateModuleRequestBodyDtoV2 } from '~/requests/presentation/v2/inputs/create-request/create-module-request-v2.dto';

export class CreateRequestBodyDtoV2 extends OmitType(CreateRequestBodyDto, [
  'moduleRequests',
] as const) {
  @ApiProperty({
    type: CreateModuleRequestBodyDtoV2,
    isArray: true,
    example: CreateModuleRequestBodyDtoV2,
  })
  @IsNotEmpty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateModuleRequestBodyDtoV2)
  moduleRequests: CreateModuleRequestBodyDtoV2[];
}
