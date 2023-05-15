import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class GetOneUserTypesUseCase {
  private readonly USER_TYPES_ROUTE = `${process.env.TENANT_URL}/user-types`;

  constructor(private httpClient: IHttpClient) {}

  async handle(attrs: GetOneUserTypesUseCase.InputAttrs) {
    const url = `${this.USER_TYPES_ROUTE}/${attrs.userTypeId}`;
    const responseOrError =
      await this.httpClient.get<GetOneUserTypesUseCase.UserTypesResponse>(url, {
        headers: {
          authorization: attrs.accessToken,
        },
      });
    if (responseOrError instanceof Error) return responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace GetOneUserTypesUseCase {
  export type InputAttrs = {
    accessToken: string;
    userTypeId: string;
  };

  export type UserType = {
    id: string;
    name: string;
    slug: string;
  };

  export type UserTypesResponse = InspireHttpResponse<UserType>;
}
