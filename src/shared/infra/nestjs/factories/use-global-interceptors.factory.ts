import { INestApplication } from '@nestjs/common';
import { NewrelicInterceptor } from '~/shared/infra/nestjs/interceptors/newrelic.interceptor';

export function useGlobalInterceptors(app: INestApplication) {
  if (!!process.env.NEW_RELIC_LICENSE_KEY)
    app.useGlobalInterceptors(new NewrelicInterceptor());
}
