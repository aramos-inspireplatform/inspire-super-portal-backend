import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ListAgenciesUseCase } from '~/agencies/application/list-agencies.use-case';
import { ListUserAgenciesUseCase } from '~/agencies/application/list-user-agencies.use-case';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { GetAgencyDto } from '~/agencies/presentation/dto/output/get-agencies.dto';
import { IsMongoIdPipe } from '~/shared/infra/nestjs/pipes/is-mongo-id.pipe';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

@Controller('agencies')
@ApiTags('Agencies')
export class AgenciesController {
  constructor(
    @Inject(AgenciesProvidersSymbols.LIST_AGENCIES_USE_CASE)
    private readonly listAgenciesUseCase: ListAgenciesUseCase,

    @Inject(AgenciesProvidersSymbols.LIST_USER_AGENCIES_USE_CASE)
    private readonly listUserAgenciesUseCase: ListUserAgenciesUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedResultsDto<GetAgencyDto> })
  async listAgencies(
    @Req() request: FastifyRequest,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const agencies = await this.listAgenciesUseCase.handle({
      accessToken: request.headers.authorization,
      searchParams: {
        keywords: searchParams.keywords,
        page: searchParams.page,
        pageSize: searchParams.pagesize,
        sortBy: searchParams.sortby,
      },
    });

    return agencies;
  }

  @Get('user-agencies/:userId/')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedResultsDto<GetAgencyDto> })
  async listUserAgencies(
    @Req() request: FastifyRequest,
    @Param('userId', IsMongoIdPipe) userId: string,
  ) {
    const agencies = await this.listUserAgenciesUseCase.handle({
      accessToken: request.headers.authorization,
      userId,
    });

    return agencies;
  }
}
