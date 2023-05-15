import { EnvironmentSchema } from '~/shared/infra/env/environment.schema';

interface TrashEnv {
  [key: string]: string | undefined;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentSchema, TrashEnv {}
  }
}

export {};
