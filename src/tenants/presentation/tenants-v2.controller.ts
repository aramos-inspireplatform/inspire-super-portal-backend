import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { FindTenantV2UseCase } from '~/tenants/application/use-case/find-tenant-v2.use-case';
import { FindAllTenantV2UseCase } from '~/tenants/application/use-case/find-all-tenant-v2.use-case';
import { TenantsV2Dto } from '~/tenants/presentation/dto/output/tenants-v2.dto';
import { TenantV2Dto } from '~/tenants/presentation/dto/output/tenant-v2.dto';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/dto/input/create-tenant-request.dto';
import { CreateTenantV2UseCase } from '~/tenants/application/use-case/create-tenant-v2.use-case';

@Controller('/v2/tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsV2Controller {
  constructor(
    @Inject(TenantProvidersSymbols.FIND_ALL_TENANT_V2_USE_CASE)
    private readonly findAllTenantV2UseCase: FindAllTenantV2UseCase,
    @Inject(TenantProvidersSymbols.FIND_TENANT_V2_USE_CASE)
    private readonly findTenantV2UseCase: FindTenantV2UseCase,
    @Inject(TenantProvidersSymbols.CREATE_TENANT_V2_USE_CASE)
    private readonly createTenantV2UseCase: CreateTenantV2UseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: TenantsV2Dto })
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

    return new TenantsV2Dto(
      TenantV2Dto.factory(TenantV2Dto, tenants.rows),
      tenants.count,
      tenants.page,
      tenants.pageSize,
    );
  }

  @Get(':integrationCode')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: TenantV2Dto })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('integrationCode') integrationCode: string,
  ) {
    const tenant = await this.findTenantV2UseCase.handle({
      accessToken: request.headers.authorization,
      integrationCode: integrationCode,
    });

    return TenantV2Dto.factory(TenantV2Dto, tenant);
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantV2Dto })
  async create(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    const tenant = await this.createTenantV2UseCase.handle({
      accessToken: request.headers.authorization,
      tenant: payload,
      currentUser: user.claims.userId,
    });
    return TenantV2Dto.factory(TenantV2Dto, tenant);
  }
}
