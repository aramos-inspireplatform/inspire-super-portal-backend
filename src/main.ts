import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '~/app.module';
// import { apiVersioningFactory } from '~/shared/infra/nestjs/factories/api-versioning.factory';
// import { corstFactory } from '~/shared/infra/nestjs/factories/cors.factory';
// import { fastifyAdapterFactory } from '~/shared/infra/nestjs/factories/fastify-adapter.factory';
// import { fastifyCompressFactory } from '~/shared/infra/nestjs/factories/fastify-compress.factory';
// import { fastifyHelmetFactory } from '~/shared/infra/nestjs/factories/fastify-helmet.factory';
// import { fastifyMultipartFactory } from '~/shared/infra/nestjs/factories/fastify-multipart.factory';
// import { swaggerFactory } from '~/shared/infra/nestjs/factories/swagger.factory';
// import { useGlobalInterceptors } from '~/shared/infra/nestjs/factories/use-global-interceptors.factory';
// import { usePipesFactory } from '~/shared/infra/nestjs/factories/use-pipes.factory';
import { NewrelicInterceptor } from '~/shared/infra/nestjs/interceptors/newrelic.interceptor';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifyCompress from '@fastify/compress';
import { ReadmeDocsService } from '~/shared/infra/readme-docs/readme-docs.service';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  // const fastifyAdapter = fastifyAdapterFactory();
  // usePipesFactory(app);
  // useGlobalInterceptors(app);
  // corstFactory(app);
  // apiVersioningFactory(app);
  // await fastifyHelmetFactory(app);
  // await fastifyMultipartFactory(app);
  // await fastifyCompressFactory(app);
  // swaggerFactory(app);

  const fastifyAdapter = new FastifyAdapter({
    logger: true,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      snapshot: true,
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
      enableDebugMessages: true,
    }),
  );
  if (!!process.env.NEW_RELIC_LICENSE_KEY && process.env.NODE_ENV !== 'test') {
    app.useGlobalInterceptors(new NewrelicInterceptor());
  }
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const fieldSize = configService.get<number>(
    'FASTIFY_LIMITS_FIELD_SIZE',
    1000000,
  );
  const fileSize = configService.get<number>('FASTIFY_LIMITS_FILE_SIZE', 100);
  await app
    .getHttpAdapter()
    .getInstance()
    .register(fastifyMultipart, {
      limits: {
        fieldNameSize: 1024, // Max field name size in bytes
        fieldSize, // Max field value size in bytes
        fields: 10, // Max number of non-file fields
        fileSize, // For multipart forms, the max file size
        files: 3, // Max number of file fields
        headerPairs: 2000, // Max number of header key=>value pairs
      },
    });

  await app.getHttpAdapter().getInstance().register(fastifyCompress);

  const readmeDocsService = new ReadmeDocsService();
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(configService.get<string>('SYSTEM_TITLE'))
    .setDescription(configService.get<string>('SYSTEM_DESCRIPTION'))
    .setVersion(process.env.npm_package_version)
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  if (process.env.NODE_ENV === 'production') {
    readmeDocsService.sendDocs({
      apiId: process.env.README_API_ID,
      swaggerJson: JSON.stringify(swaggerDocument),
    });
  }

  SwaggerModule.setup('api', app, swaggerDocument);

  const httpPort = configService.getOrThrow<number>('PORT');
  await app
    .listen(httpPort)
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
