import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const httpContext = ctx.switchToHttp();
    const request = httpContext.getRequest();
    return {
      id: request.user.id,
      email: request.user.email,
      firstName: request.user.firstName,
      lastName: request.user.lastName,
    };
  },
);
