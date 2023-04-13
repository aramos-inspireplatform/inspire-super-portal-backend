import { RequestModuleAttemptStatusesConstant } from '~/requests/domain/constants/request-module-attempt-statuses.constant';
import { RequestModuleAttempt } from '~/requests/domain/entities/request-module-attempt.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export class RequestCreatedEventUseCase {
  private readonly TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
  ) {}

  async handle(attrs: RequestCreatedEventUseCase.InputAttrs) {
    const tenantDetails = await this.getTenantDetails(attrs);
    const requestModuleAttemptStatus =
      await this.getRequestModuleAttemptStatuses();
    const requestModuleAttempts = attrs.request.requestModules.map(
      (rm) =>
        new RequestModuleAttempt({
          createdByUserId: attrs.createdByUserId,
          moduleRequest: rm,
          requestModuleAttemptStatus,
        }),
    );

    const requestModuleAttemptsResolved = await Promise.all(
      requestModuleAttempts.map((requestModuleAttempt) =>
        this.requestModuleAttemptsRepository.save({ requestModuleAttempt }),
      ),
    );

    await Promise.all(
      requestModuleAttemptsResolved.map(async (requestModuleAttempt) => {
        const payload = {
          callbackId: requestModuleAttempt.id,
          requestSettings: requestModuleAttempt.moduleRequest.settings,

          tenant: attrs.tenant,
          tenantId: tenantDetails.googleTenantId,
          tenantSlug: tenantDetails.slug,
        };

        try {
          const responseOrError = await this.httpClient.post<
            InspireHttpResponse<any>
          >(requestModuleAttempt.moduleRequest.module.deployUrl, payload, {
            headers: {
              authorization: attrs.accessToken,
            },
          });

          requestModuleAttempt.provisionApiRequestBody = payload;
          requestModuleAttempt.provisionApiResponseBody =
            responseOrError.data.body;
          requestModuleAttempt.provisionApiResponseStatusCode =
            responseOrError.status;
        } catch (error) {
          requestModuleAttempt.provisionApiRequestBody = payload;
          requestModuleAttempt.provisionApiResponseBody = error;
        }

        await this.requestModuleAttemptsRepository.save({
          requestModuleAttempt,
        });
      }),
    );

    return requestModuleAttemptsResolved;
  }

  private async getRequestModuleAttemptStatuses() {
    return this.requestModuleAttemptsStatusRepository.findById({
      id: RequestModuleAttemptStatusesConstant.Sent,
    });
  }

  private async getTenantDetails(attrs: RequestCreatedEventUseCase.InputAttrs) {
    const url = `${this.TENANT_DETAILS_URL}/${attrs.tenant.wrapperIntegrationId}`;
    const responseOrError =
      await this.httpClient.get<RequestCreatedEventUseCase.InspireTenantHttpResponse>(
        url,
        {
          headers: { authorization: attrs.accessToken },
        },
      );
    if (responseOrError instanceof Error) throw responseOrError;
    return responseOrError.data.body.data;
  }
}

export namespace RequestCreatedEventUseCase {
  export type InputAttrs = {
    request: Request;
    tenant: Tenant;
    accessToken: string;
    createdByUserId: string;
  };

  export type InspireTenant = {
    id: string;
    name: string;
    slug: string;
    googleTenantId: string;
    settings: Settings;
    logo: any;
    timezone: Timezone;
    languages: Languages;
    currencies: any[];
    agencies: Agencies;
  };

  type Settings = {
    teste: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Agencies = {
    id: string;
    name: string;
  };

  export type InspireTenantHttpResponse = InspireHttpResponse<InspireTenant>;
}
