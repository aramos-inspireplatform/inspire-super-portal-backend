import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
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

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_ISSUER: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_ISSUER: string;

  @IsNotEmpty()
  @IsString()
  JWT_RESET_PASSWORD_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_RESET_PASSWORD_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  JWT_RESET_PASSWORD_ISSUER: string;

  // SQS
  @IsString()
  AWS_SQS_REGION: string;

  @IsUrl()
  AWS_SQS_ENDPOINT: string;

  @IsString()
  AWS_SQS_ACCOUNT_NUMBER: string;

  @IsString()
  AWS_SQS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SQS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_SQS_EMAIL_QUEUE: string;
}
