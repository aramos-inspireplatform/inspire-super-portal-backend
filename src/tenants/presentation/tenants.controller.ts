import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { CreateTenantUseCase } from '~/tenants/application/use-case/create-tenant.use-case';
import { FindTenantUseCase } from '~/tenants/application/use-case/find-tenant.use-case';
import { ListAllTenantsUseCase } from '~/tenants/application/use-case/list-all-tenants.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/dto/input/create-tenant-request.dto';
import { PaginatedTenantsResponseDto } from '~/tenants/presentation/dto/output/paginated-tenants-response.dto';
import { TenantDto } from '~/tenants/presentation/dto/output/tenant.dto';
import { TenantsDto } from './dto/output/tenants.dto';

@Controller('tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.CREATE_TENANT_USE_CASE)
    private readonly createTenantUseCase: CreateTenantUseCase,
    @Inject(TenantProvidersSymbols.LIST_TENANTS_USE_CASE)
    private readonly listAllTenantsUseCase: ListAllTenantsUseCase,
    @Inject(TenantProvidersSymbols.FIND_TENANT_USE_CASE)
    private readonly findTenantUseCase: FindTenantUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedTenantsResponseDto })
  async findAll(
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
      TenantsDto.factory(TenantsDto, tenants.rows),
      tenants.count,
      tenants.page,
      tenants.pageSize,
    );
  }

  @Get(':id')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantDto })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const tenant = await this.findTenantUseCase.find({
      accessToken: request.headers.authorization,
      integrationCode: id,
    });
    return TenantDto.factory(TenantDto, tenant);
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantDto })
  async create(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    const tenant = await this.createTenantUseCase.create({
      accessToken: request.headers.authorization,
      tenant: payload,
      currentUser: user.claims.userId,
    });
    return TenantDto.factory(TenantDto, tenant);
  }
}
