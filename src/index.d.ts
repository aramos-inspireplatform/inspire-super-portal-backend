import { EnvironmentSchema } from '~/shared/infra/env/environment.schema';

export {};

interface ProcessEnv {
  [key: string]: string | undefined;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentSchema, ProcessEnv {}
  }
}
