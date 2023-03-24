import { ClassConstructor } from '~/shared/types/class-constructor.type';

export interface ISignInService {
  signIn(args: ISignInService.Args): Promise<ISignInService.Result>;
}

export namespace ISignInService {
  export type Args<
    TUser extends ISignInService.AuthUser = ISignInService.AuthUser,
  > = {
    user: TUser;
    password: string;
    throwableError?: ClassConstructor<Error>;
  };

  export type AuthUser = {
    id: string;
    passwordHash: string;
    email: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
