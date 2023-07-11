import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.repository.contract';
import { TenantPayouts } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class TenantPayoutsRepository implements ITenantPayoutsRepository {
  repository: Repository<TenantPayouts>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository =
      this.dataSource.getRepository<TenantPayouts>(TenantPayouts);
  }

  async findAll(): ITenantPayoutsRepository.FindAllResult {}
}
