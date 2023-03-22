import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

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
