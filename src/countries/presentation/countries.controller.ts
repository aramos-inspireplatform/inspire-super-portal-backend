import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ListCountriesUseCase } from '~/countries/application/use-case/list-countries.use-case';
import { CountriesProvidersSymbols } from '~/countries/ioc/countries-providers.symbols';
import { GetCountryResponseDto } from '~/countries/presentation/dto/output/country-response.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('countries')
@ApiTags('Countries')
export class CountriesController {
  constructor(
    @Inject(CountriesProvidersSymbols.LIST_COUNTRIES_USE_CASE)
    private readonly listCountriesUseCase: ListCountriesUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetCountryResponseDto, isArray: true })
  async findAll(@Req() request: FastifyRequest) {
    const countries = await this.listCountriesUseCase.list({
      accessToken: request.headers.authorization,
    });
    return GetCountryResponseDto.factory(GetCountryResponseDto, countries);
  }
}
