import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { WebHookStatusEnum } from '~/requests/domain/enums/web-hook-status.enum';

export class WebHookRequestBodyDto {
  @ApiProperty({
    example: WebHookStatusEnum.success,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(WebHookStatusEnum)
  status: WebHookStatusEnum;

  @ApiProperty({
    example: 'https://inspire.io',
    required: true,
  })
  @ValidateIf(({ status }) => status === WebHookStatusEnum.success)
  @IsNotEmpty()
  @IsString()
  moduleUrl: string;

  @ApiProperty({
    example: 'teste-asdf2',
    required: true,
  })
  @ValidateIf(({ status }) => status === WebHookStatusEnum.success)
  @IsNotEmpty()
  @IsString()
  tenantId: string;

  @ApiProperty({
    example: 'teste-asdf2',
    required: true,
  })
  @ValidateIf(({ status }) => status !== WebHookStatusEnum.success)
  @IsNotEmpty()
  reason: any;

  @ApiProperty({
    example: {
      webhookUrl: 'https://inspire.io',
      webhookStatus: 'success',
      webhookResponseBody: {
        id: 'd3e90739-d82e-417a-a0fd-307e706afcb1',
        status: 'success',
      },
    },
    required: false,
  })
  @IsOptional()
  @IsObject()
  webhookResponseBody: object;
}
