import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ListAgenciesUseCase } from '~/agencies/application/list-agencies.use-case';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { GetAgencyDto } from '~/agencies/presentation/dto/output/get-agencies.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

@Controller('agencies')
@ApiTags('Agencies')
export class AgenciesController {
  constructor(
    @Inject(AgenciesProvidersSymbols.LIST_AGENCIES_USE_CASE)
    private readonly listAgenciesUseCase: ListAgenciesUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiHeader({
    name: 'tenant',
    required: true,
    allowEmptyValue: false,
  })
  @ApiDefaultResponse({ type: PaginatedResultsDto<GetAgencyDto> })
  async listAgencies(
    @Req() request: FastifyRequest<{ Headers: { tenant: string } }>,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const agencies = await this.listAgenciesUseCase.execute({
      accessToken: request.headers.authorization,
      searchParams: {
        keywords: searchParams.keywords,
        page: searchParams.page,
        pageSize: searchParams.pagesize,
        sortBy: searchParams.sortby,
      },
      tenant: request.headers.tenant,
    });

    return agencies;
  }
}
