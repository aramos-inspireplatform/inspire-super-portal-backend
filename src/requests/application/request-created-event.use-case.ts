import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
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
      await this.getRequestModuleAttemptStatuses('Provisioning');

    const requestModuleAttempts = await Promise.all(
      attrs.request.requestModules.map(async (requestModule) => {
        const requestModuleAttempt = new RequestModuleAttempts({
          createdByUserId: attrs.createdByUserId,
          moduleRequest: requestModule,
          requestModuleAttemptStatus,
        });
        const payload = {
          callbackId: requestModuleAttempt.id,
          requestSettings: requestModule.requestSettings,
          tenant: attrs.tenant,
          tenantId: tenantDetails.googleTenantId,
          tenantSlug: tenantDetails.slug,
        };
        const url = requestModule.module.deployUrl;
        try {
          const response = await this.httpClient.post<InspireHttpResponse<any>>(
            url,
            payload,
            {
              headers: {
                authorization: attrs.accessToken,
              },
            },
          );
          requestModuleAttempt.provisionApiRequestBody = payload;
          requestModuleAttempt.provisionApiResponseBody = response.data;
          requestModuleAttempt.provisionApiResponseStatusCode = response.status;
        } catch (error) {
          const errorStatus = await this.getRequestModuleAttemptStatuses(
            'Failed',
          );
          requestModuleAttempt.provisionApiResponseBody = error;
          requestModuleAttempt.requestModuleAttemptStatus = errorStatus;
        }

        return requestModuleAttempt;
      }),
    );

    await this.requestModuleAttemptsRepository.createMultiple(
      requestModuleAttempts,
    );
  }

  private async getRequestModuleAttemptStatuses(
    id: keyof typeof RequestModuleAttemptStatusesIds,
  ) {
    return this.requestModuleAttemptsStatusRepository.findById({
      id: RequestModuleAttemptStatusesIds[id],
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
