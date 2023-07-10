import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class ListTermsRecurringIntervalUseCase {
  private readonly TERMS_RECURRING_INTERVAL_ROUTE = `${process.env.TENANT_URL}/terms-recurring-interval`;
  constructor(private readonly httpClient: IHttpClient) {}

  async list(attrs: ListTermsRecurringIntervalUseCase.InputAttrs) {
    const responseOrError =
      await this.httpClient.get<ListTermsRecurringIntervalUseCase.TermsRecurringIntervalResponse>(
        this.TERMS_RECURRING_INTERVAL_ROUTE,
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

export namespace ListTermsRecurringIntervalUseCase {
  export type InputAttrs = {
    accessToken: string;
  };

  export type TermsRecurringInterval = {
    id: string;
    name: string;
    interval: string;
    isActive: boolean;
  };

  export type TermsRecurringIntervalResponse = InspireHttpResponse<
    TermsRecurringInterval[]
  >;
}
