import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RequestCreatedEventUseCase } from '~/requests/application/request-created-event.use-case';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestEvents } from '~/shared/domain/events/request.events';

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
    requestId: string;
    tenantId: string;
    accessToken: string;
    createdByUserId: string;
  };
}
