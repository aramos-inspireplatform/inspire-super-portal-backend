import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateRequestCommand } from '~/requests/application/commands';
import { ListAllRequestsUseCase } from '~/requests/application/list-all-requests.use-case';
import { ListOneRequestModuleUseCase } from '~/requests/application/list-one-request-modules.use-case';
import { ListOneRequestUseCase } from '~/requests/application/list-one-request.use-case';
import { ReAttemptRequestModuleUseCase } from '~/requests/application/re-attempt-request-module.use-case';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import {
  RequestProviderSymbols,
  RequestProvider,
} from '~/requests/ioc/requests-providers.symbols';
import { CreateRequestBodyDto } from '~/requests/presentation/dtos/requests/create-request-body.dto';
import { WebHookRequestBodyDto } from '~/requests/presentation/dtos/requests/web-hook-request-body.dto';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-validator.dto';
import { GetRequestResponseDto } from '~/requests/presentation/dtos/responses/get-response.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

@Controller('requests')
@ApiTags('Requests')
@CustomApiExtraModels(
  PaymentProviderValidatorRequestDto,
  PaginatedResultsDto,
  GetRequestResponseDto,
)
export class RequestsController {
  constructor(
    @Inject(RequestProvider.Commands.CREATE_REQUEST_COMMAND)
    private readonly createRequestUseCase: CreateRequestCommand,
    @Inject(RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE)
    private readonly requestProvisioningWebHookUseCase: RequestProvisioningWebHookUseCase,
    @Inject(RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE)
    private readonly listAllRequestsUseCase: ListAllRequestsUseCase,
    @Inject(RequestProviderSymbols.LIST_ONE_REQUEST_USE_CASE)
    private readonly listOneRequestUseCase: ListOneRequestUseCase,
    @Inject(RequestProviderSymbols.LIST_ONE_REQUEST_MODULE_USE_CASE)
    private readonly listOneRequestModuleUseCase: ListOneRequestModuleUseCase,
    @Inject(RequestProviderSymbols.RE_ATTEMPT_MODULE_REQUEST_USE_CASE)
    private readonly reAttemptRequestModuleUseCase: ReAttemptRequestModuleUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  async create(
    @Body() payload: CreateRequestBodyDto,
    @Req() req: FastifyRequest,
  ) {
    const request = await this.createRequestUseCase.execute({
      accessToken: req.headers.authorization,
      gTenantId: payload.gTenantId,
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
    @Body() payload: WebHookRequestBodyDto,
  ) {
    await this.requestProvisioningWebHookUseCase.handle({
      requestModuleAttemptsId: id,
      status: payload.status,
      webhookResponseBody: payload,
      moduleUrl: payload.moduleUrl,
    });
  }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedResultsDto<GetRequestResponseDto> })
  async findAll(@Query() pagination: CommonPaginateDto) {
    const [requests, count] = await this.listAllRequestsUseCase.handle({
      page: pagination.page,
      pageSize: pagination.pagesize,
    });

    return new PaginatedResultsDto(
      requests,
      count,
      pagination.page,
      pagination.pagesize,
    );
  }

  @Get(':id')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetRequestResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listOneRequestUseCase.handle({ id });
  }

  @Get(':id/request-modules/:requestModuleId')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetRequestResponseDto })
  async findRequestModuleAttempts(
    @Param('requestModuleId', ParseUUIDPipe) requestModuleId: string,
  ) {
    return this.listOneRequestModuleUseCase.handle({ requestModuleId });
  }

  @Post('re-attempt/:requestModuleId')
  @AuthenticatedRoute()
  async reAttemptRequestModule(
    @Param('requestModuleId', ParseUUIDPipe) requestModuleId: string,
    @Req() request: FastifyRequest,
  ) {
    await this.reAttemptRequestModuleUseCase.handle({
      requestModuleId,
      accessToken: request.headers.authorization,
    });
  }
}
