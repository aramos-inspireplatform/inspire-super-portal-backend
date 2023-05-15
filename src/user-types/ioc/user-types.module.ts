import { Module } from '@nestjs/common';
import { GetOneUserTypesUseCaseFactoryProvider } from '~/user-types/ioc/providers/get-one-user-type-use-case-factory.provider';
import { ListUserTypesUseCaseFactoryProvider } from '~/user-types/ioc/providers/list-user-types-use-case-factory.provider';
import { UserTypesController } from '~/user-types/presentation/user-types.controller';

@Module({
  providers: [
    ListUserTypesUseCaseFactoryProvider.register(),
    GetOneUserTypesUseCaseFactoryProvider.register(),
  ],
  controllers: [UserTypesController],
})
export class UserTypesModule {}
