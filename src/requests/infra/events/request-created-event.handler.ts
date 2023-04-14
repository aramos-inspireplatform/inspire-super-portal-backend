import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RequestCreatedEventUseCase } from '~/requests/application/request-created-event.use-case';
import { Request } from '~/requests/domain/entities/request.entity';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestEvents } from '~/shared/domain/events/request.events';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

@Injectable()
export class RequestCreatedEventHandler {
  constructor(
    @Inject(RequestProviderSymbols.REQUEST_CREATED_EVENT_USE_CASE)
    private readonly requestCreatedEventUseCase: RequestCreatedEventUseCase,
  ) {}

  @OnEvent(RequestEvents.Created)
  async handleEvent(event: RequestCreatedEventHandler.InputAttrs) {
    this.requestCreatedEventUseCase.handle(event);
  }
}

export namespace RequestCreatedEventHandler {
  export type InputAttrs = {
    request: Request;
    tenant: Tenant;
    accessToken: string;
    createdByUserId: string;
  };
}
