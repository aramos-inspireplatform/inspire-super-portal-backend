import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UnauthorizedException } from '~/auth/domain/exceptions/unauthorized.exception';
import { JwtAuthGuard } from '~/auth/ioc/guards/jwt/auth.guard';
import { ApiErrorResponse } from '~/shared/infra/nestjs/decorators/api-error-response';

export const AuthenticatedRoute = () =>
  applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    ApiErrorResponse({
      message: UnauthorizedException.MESSAGE,
      status: UnauthorizedException.STATUS_CODE,
      error: UnauthorizedException.ERROR,
    }),
  );
