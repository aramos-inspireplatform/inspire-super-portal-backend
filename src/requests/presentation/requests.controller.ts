import {
  Controller,
  Post,
  Body,
  Req,
  Inject,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateRequestUseCase } from '~/requests/application/use-case/create-request.use-case';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { CreateRequestBodyDto } from '~/requests/presentation/dtos/inputs/create-request-body.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { PaginatedTenantsResponseDto } from '~/tenants/presentation/dto/output/paginated-tenants-response.dto';
import { ListTenantsResponseDto } from '../../tenants/presentation/dto/output/list-tenant-response.dto';

@Controller('requests')
@ApiTags('Requests')
export class RequestsController {
  constructor(
    @Inject(RequestProviderSymbols.CREATE_REQUEST_USE_CASE)
    private readonly createRequestUseCase: CreateRequestUseCase,
    @Inject(RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE)
    private readonly listAllRequestsUseCase: any,
  ) {}

  @Post()
  @AuthenticatedRoute()
  async createRequest(
    @Body() payload: CreateRequestBodyDto,
    @Req() req: FastifyRequest,
  ) {
    const request = await this.createRequestUseCase.execute({
      accessToken: req.headers.authorization,
      tenantId: payload.tenantId,
      moduleRequests: payload.moduleRequests.map((moduleRequest) => {
        return {
          moduleId: moduleRequest.moduleId,
          moduleSettings: moduleRequest.settings,
        };
      }),
    });

    return request;
    // return CreateRequestResponseDto.factory(CreateRequestResponseDto, request);
  }

  @Get()
  @AuthenticatedRoute()
  async findAll(@Query() pagination: CommonPaginateDto) {
    const requests = await this.listAllRequestsUseCase.execute({
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return new PaginatedTenantsResponseDto(
      requests.rows,
      requests.count,
      requests.page,
      requests.pageSize,
    );
  }
}
