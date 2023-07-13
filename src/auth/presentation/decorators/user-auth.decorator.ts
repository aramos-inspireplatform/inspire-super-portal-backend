import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';

export const UserAuth = createParamDecorator(
  async (_data, ctx: ExecutionContext): Promise<UserAuthDto> => {
    try {
      const req = ctx.switchToHttp().getRequest();
      return req?.user?.userAuth;
    } catch (error) {
      throw new UnauthorizedException();
    }
  },
);
