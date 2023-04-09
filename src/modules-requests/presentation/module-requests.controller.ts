import { Body, Controller, Inject, Post } from '@nestjs/common';
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

@Controller('module-requests')
@ApiTags('module-requests')
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
  ) {}

  @Post()
  @ApiDefaultResponse({ type: CreateModuleRequestResponseDto })
  async create(@Body() payload: CreateModuleRequestBodyDto) {
    const moduleRequest = await this.createModuleRequestUseCase.handle({
      moduleId: payload.moduleId,
      settings: payload.settings,
      tenantId: payload.tenantId,
    });
    return CreateModuleRequestResponseDto.factory(
      CreateModuleRequestResponseDto,
      moduleRequest,
    );
  }
}
