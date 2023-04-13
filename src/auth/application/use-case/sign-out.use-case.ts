import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class SignOutUseCase {
  private readonly TENANT_SIGN_OUT_URL = `${process.env.TENANT_URL}/auth/logout`;

  constructor(private readonly httpClient: IHttpClient) {}

  async signOut(attrs: SignOutUseCase.InputAttrs) {
    const responseOrError = await this.httpClient.post(
      this.TENANT_SIGN_OUT_URL,
      null,
      {
        headers: {
          Authorization: attrs.refreshToken,
        },
      },
    );
    if (responseOrError instanceof Error) throw responseOrError;
  }
}

export namespace SignOutUseCase {
  export type InputAttrs = {
    refreshToken: string;
  };
}
