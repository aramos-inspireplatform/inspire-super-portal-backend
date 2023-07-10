import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export class GetTermsRecurringIntervalUseCase {
  private readonly TERMS_RECURRING_INTERVAL_ROUTE = `${process.env.TENANT_URL}/terms-recurring-interval`;
  constructor(private readonly httpClient: IHttpClient) {}

  async get(attrs: GetTermsRecurringIntervalUseCase.InputAttrs) {
    const responseOrError =
      await this.httpClient.get<GetTermsRecurringIntervalUseCase.TermsRecurringIntervalResponse>(
        `${this.TERMS_RECURRING_INTERVAL_ROUTE}/${attrs.id}`,
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

export namespace GetTermsRecurringIntervalUseCase {
  export type InputAttrs = {
    accessToken: string;
    id: string;
  };

  export type TermsRecurringInterval = {
    id: string;
    name: string;
    interval: string;
    isActive: boolean;
  };

  export type TermsRecurringIntervalResponse =
    InspireHttpResponse<TermsRecurringInterval>;
}
