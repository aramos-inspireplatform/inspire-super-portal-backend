import { INestApplication } from '@nestjs/common';

export function corstFactory(app: INestApplication) {
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
}
