import { Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { ListAllVaultsUseCase } from '~/vaults/application/use-case/list-all-vaults.use-case';
import { VaultsProvidersSymbols } from '~/vaults/ioc/vaults-providers.symbols';
import { GetVaultsResponseDto } from '~/vaults/presentation/dto/output/get-vaults.dto';

@Controller('vaults')
@ApiTags('Vaults')
@CustomApiExtraModels()
export class VaultsController {
  constructor(
    @Inject(VaultsProvidersSymbols.LIST_ALL_VAULTS_USE_CASE)
    private readonly listAllVaultsUseCase: ListAllVaultsUseCase,
  ) {}

  @Get()
  @ApiResponse({ type: GetVaultsResponseDto, isArray: true })
  @AuthenticatedRoute()
  async listAll() {
    const [vaults] = await this.listAllVaultsUseCase.execute();
    return GetVaultsResponseDto.factory(GetVaultsResponseDto, vaults);
  }
}
