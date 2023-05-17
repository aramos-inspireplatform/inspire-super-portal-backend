import 'dotenv/config';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { ModuleRequestBatchUseCase } from '~/requests/application/batch/module-request-batch.use-case';

@Injectable()
export class RequestTasksService {
  constructor(
    @Inject(RequestProviderSymbols.MODULE_REQUEST_BATCH_USE_CASE)
    private readonly moduleRequestBatchUseCase: ModuleRequestBatchUseCase,
  ) {}

  @Cron(process.env.REQUEST_BATCH_CRON ?? CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    Logger.log('Running batch cron', 'RequestTasksService');
    if (!process.env.REQUEST_BATCH_CRON)
      Logger.warn(
        'Cron not configured, running every 10 minutes',
        'RequestTasksService',
      );

    await this.moduleRequestBatchUseCase.handle();
  }
}
