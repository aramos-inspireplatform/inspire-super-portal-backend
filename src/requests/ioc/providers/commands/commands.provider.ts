import { FactoryProvider } from '@nestjs/common';
import { CreateRequestCommandFactoryProvider } from '~/requests/ioc/providers/commands/create-request-command-factory.provider';
import { CreateRequestCommandV2FactoryProvider } from '~/requests/ioc/providers/commands/create-request-v2-command-factory.provider';

export const commandsProviders: FactoryProvider[] = [
  CreateRequestCommandFactoryProvider.register(),
  CreateRequestCommandV2FactoryProvider.register(),
];
