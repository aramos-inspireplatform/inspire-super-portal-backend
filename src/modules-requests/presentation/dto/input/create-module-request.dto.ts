import { BadRequestException } from '@nestjs/common';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ModuleRequestTypes } from '~/modules-requests/domain/constants/module-request-types.constant';
import { PaymentProviderValidatorRequestDto } from '~/modules-requests/presentation/dto/input/modules/payment/payment-validator.dto';

export class CreateModuleRequestBodyDto {
  @ApiProperty({
    type: String,
    example: '164098be-c249-4972-a95e-8d174af62c84',
  })
  @IsNotEmpty()
  @IsUUID()
  moduleId: string;

  @ApiProperty({
    type: String,
    example: '34ec3e5f-56be-455c-8e6a-2b4472c8d2de',
  })
  @IsNotEmpty()
  @IsUUID()
  tenantId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @IsDefined()
  @Type(({ object }) => {
    if (object.moduleId === ModuleRequestTypes.Payments)
      return PaymentProviderValidatorRequestDto;
    throw new BadRequestException('exception:CANNOT_VALIDATE_THIS_MODULE');
  })
  @ApiProperty({
    oneOf: [
      {
        $ref: getSchemaPath(PaymentProviderValidatorRequestDto),
      },
    ],
  })
  settings: any;
}
