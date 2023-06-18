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
import { TenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';
import { ListTenantsResponseDto } from './dto/output/list-tenant-response.dto';
import { FindTenantV2UseCase } from '~/tenants/application/use-case/find-tenant-v2.use-case';
import { FindAllTenantV2UseCase } from '~/tenants/application/use-case/find-all-tenant-v2.use-case';
import { TenantListResponseDto } from '~/tenants/presentation/dto/output/tenant-list-response.dto';

@Controller('tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.FIND_ALL_TENANT_V2_USE_CASE)
    private readonly findAllTenantV2UseCase: FindAllTenantV2UseCase,
    @Inject(TenantProvidersSymbols.FIND_TENANT_V2_USE_CASE)
    private readonly findTenantV2UseCase: FindTenantV2UseCase,
    @Inject(TenantProvidersSymbols.CREATE_TENANT_USE_CASE)
    private readonly createTenantUseCase: CreateTenantUseCase,

    // Deprecated below ----------------------------
    @Inject(TenantProvidersSymbols.LIST_TENANTS_USE_CASE)
    private readonly listAllTenantsUseCase: ListAllTenantsUseCase,
    @Inject(TenantProvidersSymbols.FIND_TENANT_USE_CASE)
    private readonly findTenantUseCase: FindTenantUseCase,
  ) {}

  @Get('/v2')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantListResponseDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const tenants = await this.findAllTenantV2UseCase.handle({
      accessToken: request.headers.authorization,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return tenants;
  }

  @Get('/v2/:integrationCode')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantResponseDto })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('integrationCode') integrationCode: string,
  ) {
    const tenant = await this.findTenantV2UseCase.handle({
      accessToken: request.headers.authorization,
      integrationCode: integrationCode,
    });

    return TenantResponseDto.factory(TenantResponseDto, tenant);
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantResponseDto })
  async createTenant(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    const tenant = await this.createTenantUseCase.create({
      accessToken: request.headers.authorization,
      tenant: payload,
      currentUser: user.claims.userId,
    });
    return TenantResponseDto.factory(TenantResponseDto, tenant);
  }

  // Deprecated below ----------------------------

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedTenantsResponseDto })
  async findAllV1(
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
      ListTenantsResponseDto.factory(ListTenantsResponseDto, tenants.rows),
      tenants.count,
      tenants.page,
      tenants.pageSize,
    );
  }

  @Get(':id')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantResponseDto })
  async findOneV1(
    @Req() request: FastifyRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const tenant = await this.findTenantUseCase.find({
      accessToken: request.headers.authorization,
      tenantId: id,
    });
    return TenantResponseDto.factory(TenantResponseDto, tenant);
  }
}
