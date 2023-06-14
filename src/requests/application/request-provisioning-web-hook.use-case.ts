import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import {
  RequestEmailTemplates,
  RequestEmailTemplatesSubject,
} from '~/requests/domain/constants/email-templates.constant';
import { RequestModuleAttemptStatusesIds } from '~/requests/domain/constants/request-module-attempt-status-ids.constant';
import { WebHookStatusEnum } from '~/requests/domain/enums/web-hook-status.enum';
import { RequestModuleAttemptNotFound } from '~/requests/domain/exceptions/request-module-attempt-not-found.exception';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IQueueService } from '~/shared/application/contracts/queue-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';

export class RequestProvisioningWebHookUseCase {
  private EMAIL_QUEUE = `${process.env.AWS_SQS_EMAIL_QUEUE}`;
  private TENANT_INTEGRATION_KEY = `${process.env.TENANT_INTEGRATION_KEY}`;

  constructor(
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly queueService: IQueueService,
    private readonly moduleRepository: IModuleRepository,
    private readonly inspireTenantService: IInspireTenantService,
    private readonly httpClient: IHttpClient,
  ) {}

  async handle(attrs: RequestProvisioningWebHookUseCase.InputAttrs) {
    const requestModuleAttemptOld =
      await this.requestModuleAttemptsRepository.findById(
        attrs.requestModuleAttemptsId,
      );

    if (!requestModuleAttemptOld) throw new RequestModuleAttemptNotFound();

    if (
      requestModuleAttemptOld.requestModuleAttemptStatus.id !==
      RequestModuleAttemptStatusesIds.Provisioning
    )
      return;

    const module = await this.moduleRepository.findByAttemptId({
      requestModuleAttemptId: requestModuleAttemptOld.id,
    });

    const request = await this.requestRepository.findByAttemptId(
      requestModuleAttemptOld.id,
    );

    const moduleStatus = await this.getModuleStatus(
      module.statusUrl,
      request.tenant.tenantId,
      this.TENANT_INTEGRATION_KEY, //moduleType.integrationKey,
    );

    if (moduleStatus.status !== attrs.status) return;

    const requestModuleAttempt = request.getRequestModuleAttempt(
      requestModuleAttemptOld.id,
    );

    requestModuleAttempt.webhookResponseBody = attrs.webhookResponseBody;

    const attemptHasSucceeded = attrs.status === WebHookStatusEnum.success;

    const requestModule = request.getRequestModuleFromModuleAttempt(
      requestModuleAttempt.id,
    );

    if (attemptHasSucceeded) {
      requestModule.setCompleted();
      requestModule.module.calculateAvgTime(
        this.minutesDiff(new Date(), requestModuleAttempt.createdDate),
      );
      requestModuleAttempt.setSucceeded();
    } else {
      requestModule.setFailed();
      requestModuleAttempt.setFailed();
    }

    if (
      requestModule.requestModuleAttempts.length >= 3 &&
      !attemptHasSucceeded
    ) {
      requestModule.setCanceled();
    }

    const tenantDetails =
      await this.inspireTenantService.getTenantAndUserDetails({
        tenantIntegrationKey: this.TENANT_INTEGRATION_KEY,
        googleTenantId: request.tenant.tenantId,
      });
    if (attemptHasSucceeded) {
      await this.inspireTenantService.linkTenantModule({
        module: module,
        attrs: {
          moduleUrl: attrs.moduleUrl,
          tenantIntegrationKey: this.TENANT_INTEGRATION_KEY,
        },
        tenant: {
          googleTenantId: tenantDetails.googleTenantId,
          id: tenantDetails.id,
          name: tenantDetails.name,
          slug: tenantDetails.slug,
        },
      });
    }
    const {
      allModulesProvided,
      allModulesProvidedContainingErrors,
      allModulesProvidedFailed,
    } = request.updateRequestStatusFromModules();
    if (allModulesProvided) {
      const welcomeSubject =
        RequestEmailTemplatesSubject.SuperPortalWelcomeInspire[
          tenantDetails.languageId.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.SuperPortalWelcomeInspire['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: tenantDetails.firstUserEmail,
          subject: welcomeSubject,
          tenant: request.tenant.tenantId,
          dynamicTemplateData: {
            accessUrl: process.env.TENANT_FRONTEND_URL,
          },
          templateLanguage: tenantDetails.languageId.id,
          templateName: RequestEmailTemplates.SuperPortalWelcomeInspire,
        },
        queueName: this.EMAIL_QUEUE,
      });
    } else if (allModulesProvidedContainingErrors) {
      const almostThereEmailSubject =
        RequestEmailTemplatesSubject.AlmostThere[
          tenantDetails.languageId.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: tenantDetails.firstUserEmail,
          subject: almostThereEmailSubject,
          tenant: request.tenant.tenantId,
          templateLanguage: tenantDetails.languageId.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    } else if (allModulesProvidedFailed) {
      await this.queueService.sendMessage({
        body: {
          to: tenantDetails.firstUserEmail,
          subject:
            RequestEmailTemplatesSubject.AlmostThere[
              tenantDetails.languageId.isoCode.toLocaleLowerCase()
            ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'],
          tenant: request.tenant.tenantId,
          templateLanguage: tenantDetails.languageId.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    }
    await this.requestRepository.update(request);
  }

  async getModuleStatus(
    url: string,
    tenantId: string,
    integrationKey: string,
  ): Promise<{ reason: string; status: 'error' } | { status: 'success' }> {
    const { data } = await this.httpClient.get(`${url}/${tenantId}`, {
      headers: { 'x-integration-key': integrationKey },
    });

    return data;
  }

  minutesDiff(dateTimeValue1: Date, dateTimeValue2: Date) {
    const differenceValue =
      (dateTimeValue1.getTime() - dateTimeValue2.getTime()) / 1000;
    return Math.abs(Math.round(differenceValue / 60));
  }
}

export namespace RequestProvisioningWebHookUseCase {
  export type InputAttrs = {
    moduleUrl: string;
    requestModuleAttemptsId: string;
    status: WebHookStatusEnum;
    webhookResponseBody: object;
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
