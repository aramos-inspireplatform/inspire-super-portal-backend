import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum NewRelicLogLevel {
  fatal = 'fatal',
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  trace = 'trace',
}

export class EnvironmentSchema {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  // Redmeio credentials
  @IsString()
  README_API_KEY: string;

  @IsString()
  README_API_ID: string;

  @IsOptional()
  @IsBooleanString()
  FASTIFY_LOGGER: string;

  // Fastify
  @IsNumber()
  FASTIFY_LIMITS_FIELD_SIZE: number;

  @IsNumber()
  FASTIFY_LIMITS_FILE_SIZE: number;

  @IsOptional()
  @IsString()
  NEW_RELIC_LICENSE_KEY: string;

  @ValidateIf(
    ({ NEW_RELIC_LICENSE_KEY }: EnvironmentSchema) => !!NEW_RELIC_LICENSE_KEY,
  )
  @IsString()
  @IsNotEmpty()
  NEW_RELIC_APP_NAME: string;

  @ValidateIf(
    ({ NEW_RELIC_LICENSE_KEY }: EnvironmentSchema) => !!NEW_RELIC_LICENSE_KEY,
  )
  @IsNotEmpty()
  @IsEnum(NewRelicLogLevel)
  NEW_RELIC_LOGGING_LEVEL: string;
}
