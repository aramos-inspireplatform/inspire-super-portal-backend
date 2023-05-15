import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export namespace ForgotPasswordResetUseCase {
  export type InputAttrs = {
    email: string;
  };
}

export class ForgotPasswordResetUseCase {
  private readonly TENANT_FORGOT_PASSWORD_IN_URL = `${process.env.TENANT_URL}/auth/forgot-password`;

  constructor(private readonly httpClient: IHttpClient) {}

  async resetPassword(attrs: ForgotPasswordResetUseCase.InputAttrs) {
    const responseOrError = await this.httpClient.post<{ body: any }>(
      this.TENANT_FORGOT_PASSWORD_IN_URL,
      attrs,
    );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data;
  }
}
