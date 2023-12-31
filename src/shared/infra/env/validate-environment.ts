import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentSchema } from '~/shared/infra/env/environment.schema';

export function validateEnvironmentSchema(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentSchema, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
