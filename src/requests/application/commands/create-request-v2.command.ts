import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { Request } from '~/requests/domain/entities/request.entity';
import { RequestModuleNotFoundException } from '~/requests/domain/exceptions/request-module-not-found.exception';
import { IModuleRepository } from '~/requests/domain/repositories/module-repository.contract';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { RequestEvents } from '~/shared/domain/events/request.events';
import { TenantNotFoundException } from '~/tenants/domain/exceptions/tenant-not-found.exception';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { ICreateRequestCommand } from '~/requests/application/commands/contracts/create-request.contract';
import { PayoutCurrenciesEnum } from '~/shared/domain/enums';

export class CreateRequestV2Command implements ICreateRequestCommand {
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly moduleRepository: IModuleRepository,
    private readonly requestRepository: IRequestRepository,
    private readonly eventEmitter: IEventEmitter,
    private readonly inspireTenantService: IInspireTenantApiService,
  ) {}

  async execute(
    attrs: ICreateRequestCommand.Input,
  ): ICreateRequestCommand.Output {
    const userRequesterData =
      await this.inspireTenantService.getTenantJwtTokenUserDetails(attrs);

    const tenant = await this.getTenantByGTenantId(attrs);

    const request = new Request({
      createdByUserEmail: userRequesterData.email,
      createdByUserId: userRequesterData.id,
      tenant,
    });

    for await (const module of attrs.modules) {
      const storedModule = await this.getModule(module);
      if (!storedModule) continue;
      const { requestSettings } = module;
      // until this time, the default is always dolar
      requestSettings.paymentProcessor.settlementCurrencyId =
        PayoutCurrenciesEnum.USD;

      request.addRequestModule({
        module: {
          id: storedModule.id,
          ...module,
        },
        requestSettings: module.requestSettings,
        ...attrs,
      });
    }

    const storedRequest = await this.requestRepository.create(request);

    this.eventEmitter.emit(RequestEvents.Created, {
      requestId: storedRequest.id,
      tenantId: tenant.id,
      accessToken: attrs.accessToken,
      createdByUserId: userRequesterData.id,
    });

    return storedRequest;
  }

  private async getTenantByGTenantId(attrs: ICreateRequestCommand.Input) {
    const tenant = await this.tenantRepository.findByGTenantId({
      gTenantId: attrs.gTenantId,
    });
    if (!tenant) throw new TenantNotFoundException();

    return tenant;
  }

  private async getModule(attrs: { moduleId: string }) {
    const requestType = await this.moduleRepository.findById({
      id: attrs.moduleId,
    });
    if (!requestType) throw new RequestModuleNotFoundException();
    return requestType;
  }
}
