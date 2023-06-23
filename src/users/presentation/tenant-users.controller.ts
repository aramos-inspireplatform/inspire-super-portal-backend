import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantUserUseCase } from '~/users/application/use-case/create-tenant-user.use-case';
import { LinkTenantUserUseCase } from '~/users/application/use-case/link-tenant-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateTenantUserRequestDto } from '~/users/presentation/dto/input/create-tenant-user-request.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';
import { ListTenantUsersUseCase } from '~/users/application/use-case/list-tenant-users.use-case';
import { PaginatedUsersResponseDto } from './dto/output/paginated-users-response.dto';
import { ListUserResponseDto } from '~/users/presentation/dto/output/list-user-response.dto';
import { ListTenantUsersFilterDto } from './dto/input/list-tenant-users-filter.dto';

@Controller('tenants/users')
@ApiTags('Tenant Users')
export class TenantsUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.CREATE_TENANT_USER)
    private readonly createTenantUserUseCase: CreateTenantUserUseCase,
    @Inject(UsersProvidersSymbols.LINK_TENANT_USER_USE_CASE)
    private readonly linkTenantUser: LinkTenantUserUseCase,
    @Inject(UsersProvidersSymbols.LIST_TENANT_USERS_USE_CASE)
    private readonly listTenantUsersUseCase: ListTenantUsersUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async create(
    @Req() request: FastifyRequest,
    @Body() payload: CreateTenantUserRequestDto,
  ) {
    const tenantUser = await this.createTenantUserUseCase.create({
      accessToken: request.headers.authorization,
      user: payload,
      tenantId: payload.tenantId,
    });
    return UserResponseDto.factory(UserResponseDto, tenantUser);
  }

  @Post('/:tenantId/:userId/link-tenant')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async linkTenant(
    @Req() request: FastifyRequest,
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
  ) {
    const tenantUser = await this.linkTenantUser.link({
      accessToken: request.headers.authorization,
      tenantId,
      userId,
    });
    return UserResponseDto.factory(UserResponseDto, tenantUser);
  }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto, isArray: true })
  async list(
    @Req() request: FastifyRequest,
    @Query() pagination: ListTenantUsersFilterDto,
  ) {
    const users = await this.listTenantUsersUseCase.list({
      accessToken: request.headers.authorization,
      googleTenantId: pagination.googleTenantId,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });
    return new PaginatedUsersResponseDto(
      ListUserResponseDto.factory(ListUserResponseDto, users.rows),
      users.count,
      users.page,
      users.pageSize,
    );
  }
}
