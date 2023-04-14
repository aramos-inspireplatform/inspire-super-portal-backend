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
import { ModulesIds } from '~/requests/domain/constants/modules-ids.constant';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/input/modules/payment/payment-validator.dto';

export class CreateModuleRequestBodyDto {
  @ApiProperty({
    type: String,
    example: '164098be-c249-4972-a95e-8d174af62c84',
  })
  @IsNotEmpty()
  @IsUUID()
  moduleId: (typeof ModulesIds)[keyof typeof ModulesIds];

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @IsDefined()
  @Type(({ object }) => {
    if (object.moduleId === ModulesIds.Payments)
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
  settings: object;
}
