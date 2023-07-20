import { UseGuards, applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UnauthorizedException } from '~/auth/domain/exceptions/unauthorized.exception';
import { UserAuthGuard } from '~/auth/ioc/guards/jwt/user-auth.guard';
import { TenantAuthGuard } from '~/auth/ioc/guards/jwt/auth.guard';
import { ApiErrorResponse } from '~/shared/infra/nestjs/decorators/api-error-response';
import { HandleUserMiddleware } from '~/shared/infra/nestjs/middlewares';

export const AuthenticatedRoute = () =>
  applyDecorators(
    ApiBearerAuth(),
    UseGuards(TenantAuthGuard),
    UseGuards(UserAuthGuard),
    UseInterceptors(HandleUserMiddleware),
    ApiErrorResponse({
      message: UnauthorizedException.MESSAGE,
      status: UnauthorizedException.STATUS_CODE,
      error: UnauthorizedException.ERROR,
    }),
  );
