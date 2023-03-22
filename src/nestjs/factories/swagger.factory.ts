import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ReadmeDocsService } from '~/readme-docs/readme-docs.service';

export function swaggerFactory(app: INestApplication) {
  const configService = app.get(ConfigService);
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
  return {
    swaggerDocument,
  };
}
