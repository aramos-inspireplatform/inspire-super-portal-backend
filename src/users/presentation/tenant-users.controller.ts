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
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantUserCommand } from '~/users/application/commands/create-tenant-user.command';
import { LinkTenantUserCommand } from '~/users/application/commands/link-tenant-user.command';
import { FindAllTenantUsersQuery } from '~/users/application/queries/find-all-tenant-users.query';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateTenantUserRequestDto } from '~/users/presentation/dtos/requests/create-tenant-user-request.dto';
import { FindAllTenantUsersRequestDto } from '~/users/presentation/dtos/requests/find-all-tenant-users-request.dto';
import { UserResponseDto } from '~/users/presentation/dtos/responses/user-response.dto';

@Controller('tenants/users')
@ApiTags('Tenant Users')
export class TenantsUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.CREATE_TENANT_USER_COMMAND)
    private readonly createTenantUserUseCase: CreateTenantUserCommand,
    @Inject(UsersProvidersSymbols.LINK_TENANT_USER_COMMAND)
    private readonly linkTenantUser: LinkTenantUserCommand,
    @Inject(UsersProvidersSymbols.FIND_ALL_TENANT_USERS_QUERY)
    private readonly listTenantUsersUseCase: FindAllTenantUsersQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto, isArray: true })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() pagination: FindAllTenantUsersRequestDto,
  ) {
    const users = await this.listTenantUsersUseCase.execute({
      accessToken: request.headers.authorization,
      gTenantId: pagination.gTenantId,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return users;
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async create(
    @Req() request: FastifyRequest,
    @Body() createDto: CreateTenantUserRequestDto,
  ) {
    const tenantUser = await this.createTenantUserUseCase.execute({
      accessToken: request.headers.authorization,
      user: createDto,
      gTenantId: createDto.gTenantId,
    });

    return tenantUser;
  }

  @Post('/:gTenantId/:userId/link-tenant')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async linkTenant(
    @Req() request: FastifyRequest,
    @Param('gTenantId') gTenantId: string,
    @Param('userId') userId: string,
  ) {
    const tenantUser = await this.linkTenantUser.execute({
      accessToken: request.headers.authorization,
      gTenantId: gTenantId,
      userId,
    });

    return tenantUser;
  }
}
