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
import { CreateAdminUserCommand } from '~/users/application/commands/create-admin-user.command';
import { FindOneAdminUserQuery } from '~/users/application/queries/find-one-admin-user.query';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateAdminUserRequestDto } from '~/users/presentation/dtos/requests/create-admin-user-request.dto';
import { FindAllAdminUsersResponseDto } from '~/users/presentation/dtos/responses/find-all-admin-users-response.dto';
import { PaginatedUsersResponseDto } from '~/users/presentation/dtos/responses/paginated-users-response.dto';
import { UserResponseDto } from '~/users/presentation/dtos/responses/user-response.dto';
import { FindAllAdminUsersQuery } from '../application/queries/find-all-admin-users.query';

@Controller('users')
@ApiTags('Admin Users')
export class TenantAdminUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.FIND_ALL_ADMIN_USERS_QUERY)
    private readonly findAllAdminUsersQuery: FindAllAdminUsersQuery,
    @Inject(UsersProvidersSymbols.FIND_ONE_ADMIN_USER_QUERY)
    private readonly findOneAdminUserQuery: FindOneAdminUserQuery,
    @Inject(UsersProvidersSymbols.CREATE_ADMIN_USER_COMMAND)
    private readonly createAdminUserCommand: CreateAdminUserCommand,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedUsersResponseDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const users = await this.findAllAdminUsersQuery.execute({
      accessToken: request.headers.authorization,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });

    return new PaginatedUsersResponseDto(
      FindAllAdminUsersResponseDto.factory(
        FindAllAdminUsersResponseDto,
        users.rows,
      ),
      users.count,
      users.page,
      users.pageSize,
    );
  }

  @Get(':id')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: FindAllAdminUsersResponseDto })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('id', ParseUUIDPipe) userId: string,
  ) {
    const user = await this.findOneAdminUserQuery.execute({
      accessToken: request.headers.authorization,
      userId,
    });

    return user;
  }

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async create(
    @Req() request: FastifyRequest,
    @Body() payload: CreateAdminUserRequestDto,
  ) {
    const user = await this.createAdminUserCommand.execute({
      accessToken: request.headers.authorization,
      user: payload,
    });

    return user;
  }
}
