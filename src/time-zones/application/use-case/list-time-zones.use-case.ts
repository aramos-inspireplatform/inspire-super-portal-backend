import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListTimeZonesUseCase {
  private readonly TIME_ZONES_ROUTE = `${process.env.TENANT_URL}/timezones`;
  constructor(private readonly httpClient: IHttpClient) {}

  async list(attrs: ListTimeZonesUseCase.InputAttrs) {
    const responseOrError =
      await this.httpClient.get<ListTimeZonesUseCase.TimeZonesResponse>(
        this.TIME_ZONES_ROUTE,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError?.data?.body?.data;
  }
}

export namespace ListTimeZonesUseCase {
  export type InputAttrs = {
    accessToken: string;
  };

  export type TimeZone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
    isDefault: boolean;
  };

  export type TimeZonesResponse = InspireHttpResponse<TimeZone[]>;
}
