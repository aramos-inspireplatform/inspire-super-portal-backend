import { FastifyAdapter } from '@nestjs/platform-fastify';

export function fastifyAdapterFactory(): FastifyAdapter {
  const fastifyLogger = !!(
    process.env.FASTIFY_LOGGER && process.env.FASTIFY_LOGGER === 'true'
  );
  return new FastifyAdapter({
    logger: fastifyLogger,
  });
}
