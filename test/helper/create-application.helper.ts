import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { DataSource } from 'typeorm';
import { AppModule } from '~/app.module';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { apiVersioningFactory } from '~/shared/infra/nestjs/factories/api-versioning.factory';
import { corstFactory } from '~/shared/infra/nestjs/factories/cors.factory';
import { fastifyAdapterFactory } from '~/shared/infra/nestjs/factories/fastify-adapter.factory';
import { fastifyCompressFactory } from '~/shared/infra/nestjs/factories/fastify-compress.factory';
import { fastifyHelmetFactory } from '~/shared/infra/nestjs/factories/fastify-helmet.factory';
import { fastifyMultipartFactory } from '~/shared/infra/nestjs/factories/fastify-multipart.factory';
import { swaggerFactory } from '~/shared/infra/nestjs/factories/swagger.factory';
import { useGlobalInterceptors } from '~/shared/infra/nestjs/factories/use-global-interceptors.factory';
import { usePipesFactory } from '~/shared/infra/nestjs/factories/use-pipes.factory';
import { QueueService } from '~/shared/infra/sqs/queue.service';

export let app: INestApplication;
export let dataSource: DataSource;
export const mockQueueService = mock<QueueService>();

jest.mock('newrelic', () => jest.fn());

const createApp = async (): Promise<{
  app: INestApplication;
  dataSource: DataSource;
}> => {
  const testModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(QueueService)
    .useValue(mockQueueService)
    .compile();

  const fastifyAdapter = fastifyAdapterFactory();

  app =
    testModule.createNestApplication<NestFastifyApplication>(fastifyAdapter);

  usePipesFactory(app);
  useGlobalInterceptors(app);
  corstFactory(app);
  apiVersioningFactory(app);
  await fastifyHelmetFactory(app);
  await fastifyMultipartFactory(app);
  await fastifyCompressFactory(app);
  swaggerFactory(app);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  dataSource = await app.get(DatabaseProvidersSymbols.DATA_SOURCE);

  return { app, dataSource };
};

global.beforeAll(async () => {
  await createApp();
});

global.afterAll(async () => {
  await dataSource.destroy();
  await app.close();
});
