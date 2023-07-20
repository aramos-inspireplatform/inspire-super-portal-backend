import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '~/app.module';
import { apiVersioningFactory } from '~/shared/infra/nestjs/factories/api-versioning.factory';
import { corstFactory } from '~/shared/infra/nestjs/factories/cors.factory';
import { fastifyAdapterFactory } from '~/shared/infra/nestjs/factories/fastify-adapter.factory';
import { fastifyCompressFactory } from '~/shared/infra/nestjs/factories/fastify-compress.factory';
import { fastifyHelmetFactory } from '~/shared/infra/nestjs/factories/fastify-helmet.factory';
import { fastifyMultipartFactory } from '~/shared/infra/nestjs/factories/fastify-multipart.factory';
import { swaggerFactory } from '~/shared/infra/nestjs/factories/swagger.factory';
import { useGlobalInterceptors } from '~/shared/infra/nestjs/factories/use-global-interceptors.factory';
import { usePipesFactory } from '~/shared/infra/nestjs/factories/use-pipes.factory';

async function bootstrap() {
  const fastifyAdapter = fastifyAdapterFactory();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      snapshot: true,
    },
  );
  usePipesFactory(app);
  useGlobalInterceptors(app);
  corstFactory(app);
  apiVersioningFactory(app);
  await fastifyHelmetFactory(app);
  await fastifyMultipartFactory(app);
  await fastifyCompressFactory(app);
  swaggerFactory(app);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.getOrThrow<number>('PORT');
  await app
    .listen(httpPort, '0.0.0.0')
    .then(async () =>
      Logger.log(
        `Application running at: ${await app.getUrl()}`,
        'ApplicationBootstrap',
      ),
    )
    .catch((reason: Error) =>
      Logger.log(reason.message, 'ApplicationBootstrap'),
    );
}
bootstrap();
