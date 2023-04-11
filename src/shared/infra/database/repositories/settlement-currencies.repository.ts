import { Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SettlementCurrency } from '~/settlement-currencies/domain/entities/settlement-currencies.entity';
import { ISettlementCurrenciesRepository } from '~/settlement-currencies/infra/contracts/repository/settlement-currencies-repository.contract';
import { SettlementCurrencies } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class SettlementCurrenciesRepository
  implements ISettlementCurrenciesRepository
{
  repository: Repository<SettlementCurrencies>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository =
      dataSource.getRepository<SettlementCurrencies>(SettlementCurrencies);
  }

  async findAll(): ISettlementCurrenciesRepository.FindAllResult {
    const [entities, count] = await this.repository
      .createQueryBuilder('settlementCurrencies')
      .where('settlementCurrencies.isActive = true')
      .getManyAndCount();
    return [entities.map((sc) => new SettlementCurrency(sc)), count];
  }
}
