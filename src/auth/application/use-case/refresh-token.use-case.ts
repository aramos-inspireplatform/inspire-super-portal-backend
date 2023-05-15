import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export namespace RefreshTokenUseCase {
  export type RefreshTokenUseCaseAttrs = {
    refreshToken: string;
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

export class RefreshTokenUseCase {
  private readonly TENANT_REFRESH_TOKEN_URL = `${process.env.TENANT_URL}/auth/refresh-token`;

  constructor(private readonly httpClient: IHttpClient) {}

  async refreshToken(args: RefreshTokenUseCase.RefreshTokenUseCaseAttrs) {
    const responseOrError =
      await this.httpClient.post<RefreshTokenUseCase.TenantSignInResponse>(
        this.TENANT_REFRESH_TOKEN_URL,
        args,
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data;
  }
}
