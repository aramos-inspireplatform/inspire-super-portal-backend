import {
  Controller,
  Post,
  Body,
  Req,
  Inject,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateRequestUseCase } from '~/requests/application/use-case/create-request.use-case';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { CreateRequestBodyDto } from '~/requests/presentation/dtos/inputs/create-request-body.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { PaginatedTenantsResponseDto } from '~/tenants/presentation/dto/output/paginated-tenants-response.dto';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/input/modules/payment/payment-validator.dto';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/use-case/request-provisioning-web-hook.use-case';

@Controller('requests')
@ApiTags('Requests')
@CustomApiExtraModels(PaymentProviderValidatorRequestDto)
export class RequestsController {
  constructor(
    @Inject(RequestProviderSymbols.CREATE_REQUEST_USE_CASE)
    private readonly createRequestUseCase: CreateRequestUseCase,
    @Inject(RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE)
    private readonly listAllRequestsUseCase: any,
    @Inject(RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE)
    private readonly requestProvisioningWebHookUseCase: RequestProvisioningWebHookUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  async createRequest(
    @Body() payload: CreateRequestBodyDto,
    @Req() req: FastifyRequest,
  ) {
    const request = await this.createRequestUseCase.execute({
      accessToken: req.headers.authorization,
      tenantId: payload.tenantId,
      requestModules: payload.moduleRequests.map((moduleRequest) => {
        return {
          moduleId: moduleRequest.moduleId,
          moduleSettings: moduleRequest.settings,
        };
      }),
    });

    return request;
    // return CreateRequestResponseDto.factory(CreateRequestResponseDto, request);
  }

  @Get()
  @AuthenticatedRoute()
  async findAll(@Query() pagination: CommonPaginateDto) {
    const requests = await this.listAllRequestsUseCase.execute({
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return new PaginatedTenantsResponseDto(
      requests.rows,
      requests.count,
      requests.page,
      requests.pageSize,
    );
  }

  @Post('/webhook/:id')
  async provisioningWebhook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ) {
    console.log(JSON.stringify(payload, null, 2));
    return this.requestProvisioningWebHookUseCase.execute({
      requestModuleAttemptsId: id,
      status: payload.status,
    });
  }
}
