import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { CreateTenantUseCase } from '~/tenants/application/use-case/create-tenant.use-case';
import { ListAllTenantsUseCase } from '~/tenants/application/use-case/list-all-tenants.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/dto/input/create-tenant-request.dto';
import { PaginatedTenantsResponseDto } from '~/tenants/presentation/dto/output/paginated-tenants-response.dto';
import { GetTenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';

@Controller('tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.CREATE_TENANT_USE_CASE)
    private readonly createTenantUseCase: CreateTenantUseCase,
    @Inject(TenantProvidersSymbols.LIST_TENANTS_USE_CASE)
    private readonly listAllTenantsUseCase: ListAllTenantsUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetTenantResponseDto })
  async createTenant(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
  ) {
    const tenant = await this.createTenantUseCase.create({
      accessToken: request.headers.authorization,
      tenant: payload,
    });
    return GetTenantResponseDto.factory(GetTenantResponseDto, tenant);
  }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedTenantsResponseDto })
  async listAll(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const tenants = await this.listAllTenantsUseCase.list({
      accessToken: request.headers.authorization,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });
    return new PaginatedTenantsResponseDto(
      GetTenantResponseDto.factory(GetTenantResponseDto, tenants.rows),
      tenants.count,
      tenants.page,
      tenants.pageSize,
    );
    return tenants;
  }
}
