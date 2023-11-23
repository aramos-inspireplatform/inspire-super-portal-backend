import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwtDecode from 'jwt-decode';

export type UserFromRequest = {
  claims: Claims;
  iat: number;
  exp: number;
  iss: string;
  tenantId: string;
};

export interface Claims {
  name: string;
  authTime: number;
  email: string;
  userId: string;
  userType: string;
}

export const GetUserFromRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const decodedCustomToken = jwtDecode(request?.headers?.authorization);
    return decodedCustomToken;
  },
);
