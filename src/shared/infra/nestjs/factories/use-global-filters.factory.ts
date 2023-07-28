import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DefaultExceptionsFilter } from '~/shared/infra/nestjs/filters/default-exception.filter';

export function useGlobalFilters(app: INestApplication) {
  app.useGlobalFilters(new DefaultExceptionsFilter(app.get(HttpAdapterHost)));
}
