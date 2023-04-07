import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListUserTypesUseCase {
  private readonly USER_TYPES_ROUTE = `${process.env.TENANT_URL}/user-types`;

  constructor(private readonly httpClient: IHttpClient) {}

  async find(attrs: ListUserTypesUseCase.InputAttrs) {
    const responseOrError =
      await this.httpClient.get<ListUserTypesUseCase.UserTypesResponse>(
        this.USER_TYPES_ROUTE,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace ListUserTypesUseCase {
  export type UserType = {
    id: string;
    name: string;
    slug: string;
  };

  export type InputAttrs = {
    accessToken: string;
  };

  export type UserTypesResponse = InspireHttpResponse<UserType[]>;
}
