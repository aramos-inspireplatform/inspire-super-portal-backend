import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';

export class ListLanguageUseCase {
  private readonly LANGUAGES_ROUTE = `${process.env.TENANT_URL}/languages`;

  constructor(private readonly httpClient: IHttpClient) {}

  async listAll(attrs: ListLanguageUseCase.InputAttrs) {
    const url = `${this.LANGUAGES_ROUTE}?pagesize=1000&page=0`;
    const responseOrError =
      await this.httpClient.get<ListLanguageUseCase.LanguagesResponse>(url, {
        headers: {
          authorization: attrs.accessToken,
        },
      });
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data?.rows;
  }
}

export namespace ListLanguageUseCase {
  export type Language = {
    id: string;
    name: string;
    isoCode: string;
    isDefault: boolean;
    isActive: boolean;
  };

  export type LanguagesResponse = InspireHttpPaginatedResponse<Language>;

  export type InputAttrs = {
    accessToken: string;
  };
}
