import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Version,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import {
  TenantProviders,
  TenantProvidersSymbols,
} from '~/tenants/ioc/tenants-providers.symbols';
import { FindOneTenantQuery } from '~/tenants/application/queries/find-one-tenant.query';
import { FindAllTenantsQuery } from '~/tenants/application/queries/find-all-tenants.query';
import { FindAllTenantsOutput } from '~/tenants/presentation/v1/dtos/responses/find-all-tenants.output';
import { FindTenantOutput } from '~/tenants/presentation/v1/dtos/responses/find-tenant.output';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';
import {
  CreateTenantRequestBodyDto,
  UpdateTenantRequestDto,
} from '~/tenants/presentation/v1/dtos/requests';
import {
  CreateTenantCommand,
  UpdateTenantCommand,
} from '~/tenants/application/commands';

@Controller('/tenants')
@ApiTags('Tenants')
@CustomApiExtraModels()
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.FIND_ALL_TENANTS_QUERY)
    private readonly findAllTenantQuery: FindAllTenantsQuery,
    @Inject(TenantProvidersSymbols.FIND_ONE_TENANT_QUERY)
    private readonly findTenantQuery: FindOneTenantQuery,
    @Inject(TenantProviders.Commands.CREATE_TENANT_COMMAND)
    private readonly createTenantCommand: CreateTenantCommand,
    @Inject(TenantProviders.Commands.UPDATE_TENANT)
    private readonly updateTenantCommand: UpdateTenantCommand,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllTenantsOutput })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() paginationDto: CommonPaginateDto,
  ) {
    const tenants = await this.findAllTenantQuery.execute({
      accessToken: request.headers.authorization,
      pagination: {
        ...paginationDto,
        pageSize: paginationDto.pagesize,
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
    @Body() createDto: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    const tenant = await this.createTenantCommand.execute({
      accessToken: request.headers.authorization,
      tenant: {
        name: createDto.name,
        accountName: createDto.accountName,
        slug: createDto.slug,
        countryId: createDto.countryId,
        settings: createDto.settings,
        agencyId: createDto.agencyId,
        timezoneId: createDto.timezoneId,
        languageId: createDto.languageId,
      },
      currentUserId: user.claims.userId,
      currentUserEmail: user.claims.email,
    });

    return tenant;
  }

  @Patch(':gTenantId')
  @AuthenticatedRoute()
  async updateTenantDualPrice(
    @Req() request: FastifyRequest,
    @Body() updateDto: UpdateTenantRequestDto,
    @Param('gTenantId') gTenantId: string,
  ) {
    return this.updateTenantCommand.execute({
      accessToken: request.headers.authorization,
      tenantId: gTenantId,
      body: updateDto,
    });
  }
}
