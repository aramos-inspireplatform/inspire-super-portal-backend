import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateRequestUseCase } from '~/requests/application/create-request.use-case';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { CreateRequestBodyDto } from '~/requests/presentation/dtos/inputs/create-request-body.dto';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/input/modules/payment/payment-validator.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('requests')
@ApiTags('Requests')
@CustomApiExtraModels(PaymentProviderValidatorRequestDto)
export class RequestsController {
  constructor(
    @Inject(RequestProviderSymbols.CREATE_REQUEST_USE_CASE)
    private readonly createRequestUseCase: CreateRequestUseCase,
    @Inject(RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE)
    private readonly requestProvisioningWebHookUseCase: RequestProvisioningWebHookUseCase, // @Inject(RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE) // private readonly listAllRequestsUseCase: any,
  ) {}

  @Post()
  @AuthenticatedRoute()
  async createRequest(
    @Body() payload: CreateRequestBodyDto,
    @Req() req: FastifyRequest,
  ) {
    const request = await this.createRequestUseCase.handle({
      accessToken: req.headers.authorization,
      tenantId: payload.tenantId,
      modules: payload.moduleRequests.map((moduleRequest) => {
        return {
          moduleId: moduleRequest.moduleId,
          requestSettings: moduleRequest.settings,
        };
      }),
    });
    return request;
  }

  @Post('/webhook/:id')
  async provisioningWebhook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ) {
    return this.requestProvisioningWebHookUseCase.handle({
      requestModuleAttemptsId: id,
      status: payload.status,
      webhookResponseBody: payload,
    });
  }
}
