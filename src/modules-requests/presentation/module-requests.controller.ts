import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateModuleRequestUseCase } from '~/modules-requests/application/use-case/create-module-request.use-case';
import { ModuleRequestsProvidersSymbols } from '~/modules-requests/ioc/module-requests-providers.symbols';
import { CreateModuleRequestBodyDto } from '~/modules-requests/presentation/dto/input/create-module-request.dto';

@Controller('module-requests')
@ApiTags('module-requests')
export class ModuleRequestsController {
  constructor(
    @Inject(ModuleRequestsProvidersSymbols.CREATE_MODULE_REQUEST_USE_CASE)
    private readonly createModuleRequestUseCase: CreateModuleRequestUseCase,
  ) {}

  @Post()
  async create(@Body() payload: CreateModuleRequestBodyDto) {
    const moduleRequest = await this.createModuleRequestUseCase.handle({
      moduleId: payload.moduleId,
      settings: payload.settings,
      tenantId: payload.tenantId,
    });
    return moduleRequest;
  }
}
