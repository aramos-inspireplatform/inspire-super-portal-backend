import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSettlementCurrenciesResponseDto } from '~/settlement-currencies/presentation/dto/output/get-settlement-currencies.dto';
import { SettlementCurrenciesRepository } from '~/shared/infra/database/repositories/settlement-currencies.repository';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('settlement-currencies')
@ApiTags('Settlement Currencies')
export class SettlementCurrenciesController {
  constructor(
    private readonly settlementCurrenciesRepository: SettlementCurrenciesRepository,
  ) {}

  @Get()
  @AuthenticatedRoute()
  async findAll() {
    const [currencies] = await this.settlementCurrenciesRepository.findAll();
    return GetSettlementCurrenciesResponseDto.factory(
      GetSettlementCurrenciesResponseDto,
      currencies,
    );
  }
}
