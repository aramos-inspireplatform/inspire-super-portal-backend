import {
  RequestEmailTemplates,
  RequestEmailTemplatesSubject,
} from '~/requests/domain/constants/email-templates.constant';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestStatusesIds } from '~/requests/domain/constants/request-statuses-ids.constant';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { IQueueService } from '~/shared/application/contracts/queue-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';

export class RequestProvisioningWebHookUseCase {
  private EMAIL_QUEUE = `${process.env.AWS_SQS_EMAIL_QUEUE}`;
  private TENANT_DETAILS_URL = `${process.env.TENANT_URL}/tenants`;
  private TENANT_MODULE_URL = `${process.env.TENANT_URL}/modules`;
  private TENANT_TENANT_MODULE_URL = `${process.env.TENANT_URL}/tenant-modules`;
  private USERS_TENANT_URL = `${process.env.TENANT_URL}/user`;

  constructor(
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
    private readonly requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly requestStautusRepository: IRequestStatusesRepository,
    private readonly requestModuleRepository: IRequestModuleRepository,
    private readonly requestModuleStatusRepository: IRequestModuleStatusRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly tenantStatusRepository: ITenantStatusesRepository,
    private readonly queueService: IQueueService,
    private readonly httpClient: IHttpClient,
  ) {}

  async handle(attrs: RequestProvisioningWebHookUseCase.InputAttrs) {
    const requestModuleAttempt =
      await this.requestModuleAttemptsRepository.findById(
        attrs.requestModuleAttemptsId,
      );
    if (!requestModuleAttempt) return;
    const succeeded = attrs.status === 'success';
    const requestModuleAttemptStatus = succeeded
      ? await this.requestModuleAttemptsStatusRepository.findById({
          id: RequestModuleAttemptStatusesIds.Completed,
        })
      : await this.requestModuleAttemptsStatusRepository.findById({
          id: RequestModuleAttemptStatusesIds.Failed,
        });

    requestModuleAttempt.requestModuleAttemptStatus =
      requestModuleAttemptStatus;

    requestModuleAttempt.webhookResponseBody = attrs.webhookResponseBody;

    await this.requestModuleAttemptsRepository.updateStatus(
      requestModuleAttempt.id,
      requestModuleAttempt,
    );

    await this.requestModuleAttemptsRepository.updateWebhookResponse(
      requestModuleAttempt.id,
      requestModuleAttempt,
    );

    const requestModule = await this.requestModuleRepository.findById(
      requestModuleAttempt.moduleRequest.id,
    );

    requestModule.moduleRequestStatus = succeeded
      ? await this.requestModuleStatusRepository.findById({
          id: ModuleRequestStatusesIds.Completed,
        })
      : await this.requestModuleStatusRepository.findById({
          id: ModuleRequestStatusesIds.Failed,
        });

    await this.requestModuleRepository.updateStatus(
      requestModule.id,
      requestModule.moduleRequestStatus.id,
    );

    const request = await this.requestRepository.findById(
      requestModuleAttempt.moduleRequest.request.id,
    );

    const tenantDetailsResponse =
      await this.httpClient.get<RequestProvisioningWebHookUseCase.InspireTenantDetailsResponse>(
        `${this.TENANT_DETAILS_URL}/${request.tenant.wrapperIntegrationId}`,
        {
          headers: {
            authorization: attrs.accessToken,
          },
        },
      );
    const inspireTenantDetails = tenantDetailsResponse.data.body.data;

    const userReponse =
      await this.httpClient.get<RequestProvisioningWebHookUseCase.InspireUserResponse>(
        `${this.USERS_TENANT_URL}?isPaginated=true`,
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: inspireTenantDetails.googleTenantId,
          },
        },
      );

    const tenantUserDetails = userReponse.data.body.data.rows?.[0];

    const allRequestModulesFromRequest =
      await this.requestModuleRepository.findByRequestId(request.id);

    const allFailed = allRequestModulesFromRequest.filter(
      (rm) => rm.moduleRequestStatus.id === ModuleRequestStatusesIds.Failed,
    );

    const allCompleted = allRequestModulesFromRequest.filter(
      (rm) => rm.moduleRequestStatus.id === ModuleRequestStatusesIds.Completed,
    );

    const allModulesProvided =
      allCompleted.length === allRequestModulesFromRequest.length;
    const allModulesProvidedFailed =
      allFailed.length === allRequestModulesFromRequest.length;
    const allModulesProvidedContainingErrors =
      allCompleted.length + allFailed.length ===
      allRequestModulesFromRequest.length;

    if (allModulesProvided) {
      const welcomeSubject =
        RequestEmailTemplatesSubject.SuperPortalWelcomeInspire[
          inspireTenantDetails.languages.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.SuperPortalWelcomeInspire['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: tenantUserDetails.email,
          subject: welcomeSubject,
          tenant: request.tenant.tenantId,
          dynamicTemplateData: {
            accessUrl: process.env.TENANT_FRONTEND_URL,
          },
          templateLanguage: inspireTenantDetails.languages.id,
          templateName: RequestEmailTemplates.SuperPortalWelcomeInspire,
        },
        queueName: this.EMAIL_QUEUE,
      });
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.Completed,
      });
      const tenant = await this.tenantRepository.findById({
        id: request.tenant.id,
      });
      tenant.tenantStatus = await this.tenantStatusRepository.findById({
        id: TenantStatusesConstant.Active,
      });
      await this.tenantRepository.save({ tenant });
    } else if (allModulesProvidedFailed) {
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.Canceled,
      });
      await this.queueService.sendMessage({
        body: {
          to: tenantUserDetails.email,
          subject:
            RequestEmailTemplatesSubject.AlmostThere[
              inspireTenantDetails.languages.isoCode.toLocaleLowerCase()
            ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'],
          tenant: request.tenant.tenantId,
          templateLanguage: inspireTenantDetails.languages.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    } else if (allModulesProvidedContainingErrors) {
      request.requestStatus = await this.requestStautusRepository.findById({
        id: RequestStatusesIds.PartiallyCompleted,
      });
      const almostThereEmailSubject =
        RequestEmailTemplatesSubject.AlmostThere[
          inspireTenantDetails.languages.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: tenantUserDetails.email,
          subject: almostThereEmailSubject,
          tenant: request.tenant.tenantId,
          templateLanguage: inspireTenantDetails.languages.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    }

    if (succeeded) {
      const moduleResponse = await this.httpClient.post<InspireHttpResponse>(
        `${this.TENANT_MODULE_URL}`,
        {
          name: requestModule.module.name,
          slug: requestModule.module.name.toLowerCase(),
          isActive: true,
        },
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: inspireTenantDetails.googleTenantId,
          },
        },
      );
      await this.httpClient.post(
        `${this.TENANT_TENANT_MODULE_URL}`,
        {
          tenantId: inspireTenantDetails.id,
          moduleId: moduleResponse.data.body.data.id,
          name: requestModule.module.name,
          link: attrs.moduleUrl,
          isActive: true,
        },
        {
          headers: {
            authorization: attrs.accessToken,
            tenant: inspireTenantDetails.googleTenantId,
          },
        },
      );
    }

    await this.requestRepository.updateStatus(
      request.id,
      request.requestStatus.id,
    );
  }
}

export namespace RequestProvisioningWebHookUseCase {
  export type InputAttrs = {
    moduleUrl: string;
    requestModuleAttemptsId: string;
    status: 'success' | 'error';
    webhookResponseBody: object;
    accessToken: string;
  };

  export type InspireTenantDetails = {
    id: string;

    googleTenantId: string;
    languages: Languages;
  };

  export type Languages = {
    id: string;
    name: string;
    isoCode: string;
  };

  export type InspireTenantDetailsResponse =
    InspireHttpResponse<InspireTenantDetails>;

  export type InspireUser = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    status: string;
    adminBlockedDate: any;
    createdAt: string;
    phoneNumber: string;
  };

  export type InspireUserResponse = InspireHttpPaginatedResponse<InspireUser>;
}
