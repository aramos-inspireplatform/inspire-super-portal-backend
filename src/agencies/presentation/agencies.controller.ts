import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { FindAllAgenciesQuery } from '~/agencies/application/queries/find-all-agencies.query';
import { FindAllUserAgenciesQuery } from '~/agencies/application/queries/find-all-user-agencies.query';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { GetAgencyDto } from '~/agencies/presentation/dto/output/get-agencies.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

@Controller('agencies')
@ApiTags('Agencies')
export class AgenciesController {
  constructor(
    @Inject(AgenciesProvidersSymbols.FIND_ALL_AGENCIES_QUERY)
    private readonly findAllAgenciesQuery: FindAllAgenciesQuery,
    @Inject(AgenciesProvidersSymbols.FIND_ALL_USER_AGENCIES_QUERY)
    private readonly findAllUserAgenciesQuery: FindAllUserAgenciesQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedResultsDto<GetAgencyDto> })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const agencies = await this.findAllAgenciesQuery.execute({
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
  async findAllByUser(
    @Req() request: FastifyRequest,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const agencies = await this.findAllUserAgenciesQuery.execute({
      accessToken: request.headers.authorization,
      userId,
    });

    return agencies;
  }
}
