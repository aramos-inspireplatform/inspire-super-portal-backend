import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { BaseDto } from '~/shared/presentation/base.dto';

export const CustomApiExtraModels = (...decorators: any[]) =>
  applyDecorators(ApiExtraModels(...decorators, BaseDto));
