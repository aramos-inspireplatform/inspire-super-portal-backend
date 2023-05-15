import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ListLanguageUseCase } from '~/languages/application/use-case/list-languages.use-case';
import { LanguageProvidersSymbols } from '~/languages/ioc/languages-providers.symbols';
import { GetLanguageResponseDto } from '~/languages/presentation/dto/input/language-response.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('languages')
@ApiTags('Languages')
export class LanguagesController {
  constructor(
    @Inject(LanguageProvidersSymbols.LIST_LANGUAGE_USE_CASE)
    private readonly listLanguagesUseCase: ListLanguageUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetLanguageResponseDto, isArray: true })
  async listAll(@Req() request: FastifyRequest) {
    const languages = await this.listLanguagesUseCase.listAll({
      accessToken: request.headers.authorization,
    });
    return GetLanguageResponseDto.factory(GetLanguageResponseDto, languages);
  }
}
