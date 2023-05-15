import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { IsMongoIdPipe } from '~/shared/infra/nestjs/pipes/is-mongo-id.pipe';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { GetOneUserTypesUseCase } from '~/user-types/application/get-one-user-types.use-case';
import { ListUserTypesUseCase } from '~/user-types/application/list-user-types.use-case';
import { UserTypesProvidersSymbols } from '~/user-types/ioc/user-types-providers.symbols';
import { UserTypesResponseDto } from '~/user-types/presentation/dto/output/user-types-response.dto';

@Controller('user-types')
@ApiTags('User Types')
export class UserTypesController {
  constructor(
    @Inject(UserTypesProvidersSymbols.LIST_USER_TYPES_USE_CASE)
    private readonly listUserTypesUseCase: ListUserTypesUseCase,
    @Inject(UserTypesProvidersSymbols.GET_ONE_USER_TYPES_USE_CASE)
    private readonly getOneUserTypesUseCase: GetOneUserTypesUseCase,
  ) {}

  @Get()
  @ApiDefaultResponse({ type: UserTypesResponseDto, isArray: true })
  @AuthenticatedRoute()
  async findAll(@Req() request: FastifyRequest) {
    const userTypes = this.listUserTypesUseCase.find({
      accessToken: request.headers.authorization,
    });
    return UserTypesResponseDto.factory(UserTypesResponseDto, userTypes);
  }

  @Get(':id')
  @ApiDefaultResponse({ type: UserTypesResponseDto })
  @AuthenticatedRoute()
  async findOne(
    @Req() request: FastifyRequest,
    @Param('id', IsMongoIdPipe) id: string,
  ) {
    const userTypes = this.getOneUserTypesUseCase.handle({
      accessToken: request.headers.authorization,
      userTypeId: id,
    });
    return UserTypesResponseDto.factory(UserTypesResponseDto, userTypes);
  }
}
