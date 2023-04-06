import { Module } from '@nestjs/common';
import { ListLanguagueFactoryProvider } from '~/languages/ioc/providers/list-languages-factory.provider';
import { LanguagesController } from '~/languages/presentation/languages.controller';

@Module({
  providers: [ListLanguagueFactoryProvider.register()],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
