import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { CreateModuleRequestUseCase } from '~/modules-requests/application/use-case/create-module-request.use-case';
import { ModuleRequestsProvidersSymbols } from '~/modules-requests/ioc/module-requests-providers.symbols';
import { CreateModuleRequestBodyDto } from '~/modules-requests/presentation/dto/input/create-module-request.dto';
import { PaymentProviderValidatorRequestDto } from '~/modules-requests/presentation/dto/input/modules/payment/payment-validator.dto';
import {
  CreateModuleRequestResponseDto,
  ModuleRequestStatus,
  ModuleRequestType,
  Tenant,
} from '~/modules-requests/presentation/dto/output/create-module-request-response.dto';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { ListModuleRequestUseCase } from '~/modules-requests/application/use-case/list-module-requests.use-case';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('module-requests')
@ApiTags('Module Requests')
@CustomApiExtraModels(
  PaymentProviderValidatorRequestDto,
  CreateModuleRequestResponseDto,
  ModuleRequestStatus,
  ModuleRequestType,
  Tenant,
)
export class ModuleRequestsController {
  constructor(
    @Inject(ModuleRequestsProvidersSymbols.CREATE_MODULE_REQUEST_USE_CASE)
    private readonly createModuleRequestUseCase: CreateModuleRequestUseCase,
    @Inject(ModuleRequestsProvidersSymbols.LIST_MODULE_REQUEST_USE_CASE)
    private readonly listModuleRequestUseCase: ListModuleRequestUseCase,
  ) {}

  // @Post()
  // @AuthenticatedRoute()
  // @ApiDefaultResponse({ type: CreateModuleRequestResponseDto })
  // async create(@Body() payload: CreateModuleRequestBodyDto) {
  //   const moduleRequest = await this.createModuleRequestUseCase.handle({
  //     moduleId: payload.moduleId,
  //     settings: payload.settings,
  //     tenantId: payload.tenantId,
  //   });
  //   return CreateModuleRequestResponseDto.factory(
  //     CreateModuleRequestResponseDto,
  //     moduleRequest,
  //   );
  // }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: CreateModuleRequestResponseDto }) // TODO: Paginated
  async list(@Query() pagination: CommonPaginateDto) {
    const moduleRequests = await this.listModuleRequestUseCase.list({
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });
    return new PaginatedResultsDto(
      moduleRequests.rows, // TODO add dto to output
      moduleRequests.count,
      pagination.page,
      pagination.pagesize,
    );
  }
}
