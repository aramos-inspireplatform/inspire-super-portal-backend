import { INestApplication, ValidationPipe } from '@nestjs/common';

export function usePipesFactory(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
      enableDebugMessages: true,
    }),
  );
}
