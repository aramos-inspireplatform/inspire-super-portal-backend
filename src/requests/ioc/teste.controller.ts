import { Controller, Inject, Post } from '@nestjs/common';
import { ModuleRequestBatchUseCase } from '~/requests/application/batch/module-request-batch.use-case';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';

@Controller('teste')
export class TesteController {
  constructor(
    @Inject(RequestProviderSymbols.MODULE_REQUEST_BATCH_USE_CASE)
    private readonly moduleRequestBatchUseCase: ModuleRequestBatchUseCase,
  ) {}

  @Post()
  async test() {
    const result = await this.moduleRequestBatchUseCase.handle();

    return result;
  }
}
