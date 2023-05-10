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
import {
  InspireHttpPaginatedResponse,
  InspireHttpResponse,
} from '~/shared/types/inspire-http-response.type';

export class RequestProvisioningWebHookUseCase {
  private EMAIL_QUEUE = `${process.env.AWS_SQS_EMAIL_QUEUE}`;

  constructor(
    private readonly requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly queueService: IQueueService,
    private readonly moduleRepository: IModuleRepository,
    private readonly inspireTenantService: IInspireTenantService,
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
    const request = await this.requestRepository.findByAttemptId(
      requestModuleAttemptOld.id,
    );
    const requestModuleAttempt = request.getRequestModuleAttempt(
      requestModuleAttemptOld.id,
    );
    const attemptHasSucceeded = attrs.status === WebHookStatusEnum.success;
    const requestModule = request.getRequestModuleFromModuleAttempt(
      requestModuleAttempt.id,
    );
    if (attemptHasSucceeded) {
      requestModule.setCompleted();
      requestModuleAttempt.succeededAttempt();
    } else {
      requestModule.setFailed();
      requestModuleAttempt.failedAttempt();
    }
    if (requestModule.requestModuleAttempts.length >= 3) {
      requestModule.setCanceled();
    }
    requestModuleAttempt.webhookResponseBody = attrs.webhookResponseBody;
    const moduleType = await this.moduleRepository.findByAttemptId({
      requestModuleAttemptId: requestModuleAttempt.id,
    });
    const { tenant, user } =
      await this.inspireTenantService.getTenantAndUserDetails({
        accessToken: attrs.accessToken,
        tenantWrapperIntegrationId: request.tenant.wrapperIntegrationId,
      });
    if (attemptHasSucceeded) {
      await this.inspireTenantService.linkTenantModule({
        moduleType,
        attrs,
        tenant,
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
          tenant.languages.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.SuperPortalWelcomeInspire['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: user.email,
          subject: welcomeSubject,
          tenant: request.tenant.tenantId,
          dynamicTemplateData: {
            accessUrl: process.env.TENANT_FRONTEND_URL,
          },
          templateLanguage: tenant.languages.id,
          templateName: RequestEmailTemplates.SuperPortalWelcomeInspire,
        },
        queueName: this.EMAIL_QUEUE,
      });
    }
    if (allModulesProvidedFailed) {
      await this.queueService.sendMessage({
        body: {
          to: user.email,
          subject:
            RequestEmailTemplatesSubject.AlmostThere[
              tenant.languages.isoCode.toLocaleLowerCase()
            ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'],
          tenant: request.tenant.tenantId,
          templateLanguage: tenant.languages.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    }
    if (allModulesProvidedContainingErrors) {
      const almostThereEmailSubject =
        RequestEmailTemplatesSubject.AlmostThere[
          tenant.languages.isoCode.toLocaleLowerCase()
        ] ?? RequestEmailTemplatesSubject.AlmostThere['en-us'];
      await this.queueService.sendMessage({
        body: {
          to: user.email,
          subject: almostThereEmailSubject,
          tenant: request.tenant.tenantId,
          templateLanguage: tenant.languages.id,
          templateName: RequestEmailTemplates.AlmostThere,
        },
        queueName: this.EMAIL_QUEUE,
      });
    }
    await this.requestRepository.update(request);
  }
}

export namespace RequestProvisioningWebHookUseCase {
  export type InputAttrs = {
    moduleUrl: string;
    requestModuleAttemptsId: string;
    status: WebHookStatusEnum;
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
