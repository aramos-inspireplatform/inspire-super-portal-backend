import { Module } from '@nestjs/common';
import { ListAgenciesUseCaseFactoryProvider } from '~/agencies/ioc/providers/list-agencies-use-case-factory.provider';
import { ListUserAgenciesUseCaseFactoryProvider } from '~/agencies/ioc/providers/list-user-agencies-use-case-factory.provider';
import { AgenciesController } from '~/agencies/presentation/agencies.controller';

@Module({
  providers: [
    ListAgenciesUseCaseFactoryProvider.register(),
    ListUserAgenciesUseCaseFactoryProvider.register(),
  ],
  controllers: [AgenciesController],
})
export class AgenciesModule {}
