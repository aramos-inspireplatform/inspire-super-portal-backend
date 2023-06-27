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
import { FindTenantQuery } from '~/tenants/application/queries/find-tenant.query';
import { FindAllTenantsQuery } from '~/tenants/application/queries/find-all-tenants.query';
import { FindAllTenantsOutput } from '~/tenants/presentation/dto/output/find-all-tenants.output';
import { FindTenantOutput } from '~/tenants/presentation/dto/output/find-tenant.output';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/dto/input/create-tenant-request.dto';
import { CreateTenantCommand } from '~/tenants/application/commands/create-tenant.command';

@Controller('/tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.FIND_ALL_TENANTS_QUERY)
    private readonly findAllTenantQuery: FindAllTenantsQuery,
    @Inject(TenantProvidersSymbols.FIND_TENANT_QUERY)
    private readonly findTenantQuery: FindTenantQuery,
    @Inject(TenantProvidersSymbols.CREATE_TENANT_COMMAND)
    private readonly createTenantCommand: CreateTenantCommand,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllTenantsOutput })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const tenants = await this.findAllTenantQuery.execute({
      accessToken: request.headers.authorization,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return tenants;
  }

  @Get(':gTenantId')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindTenantOutput })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('gTenantId') gTenantId: string,
  ) {
    const tenant = await this.findTenantQuery.execute({
      accessToken: request.headers.authorization,
      gTenantId,
    });

    return tenant;
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: FindTenantOutput })
  async create(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    const tenant = await this.createTenantCommand.execute({
      accessToken: request.headers.authorization,
      tenant: payload,
      currentUser: user.claims.userId,
    });
    return FindTenantOutput.factory(FindTenantOutput, tenant);
  }
}
