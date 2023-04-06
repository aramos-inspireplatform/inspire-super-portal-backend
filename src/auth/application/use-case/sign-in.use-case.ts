import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export namespace SignInUseCase {
  export type SignInUseCaseAttrs = {
    email: string;
    password: string;
  };

  export type TenantSignInResponse = {
    body: {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    };
  };
}

export class SignInUseCase {
  private readonly TENANT_SIGN_IN_URL = `${process.env.TENANT_URL}/auth/sign-in`;

  constructor(private readonly httpClient: IHttpClient) {}

  async signIn(args: SignInUseCase.SignInUseCaseAttrs) {
    const responseOrError =
      await this.httpClient.post<SignInUseCase.TenantSignInResponse>(
        this.TENANT_SIGN_IN_URL,
        {
          email: args.email,
          password: args.password,
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data;
  }
}
