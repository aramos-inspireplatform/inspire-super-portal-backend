import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Processor } from '~/processors/domain/entity/processor.entity';
import { IProcessorsRepository } from '~/processors/infra/contracts/repository/processors-repository.contract';
import { Processors } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class ProcessorsRepository implements IProcessorsRepository {
  repository: Repository<Processors>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository<Processors>(Processors);
  }

  async findAll(): IProcessorsRepository.FindAllResult {
    // TODO: verificar se vamos fazer esse filtro: { where: { isActive: true } }
    const [processsors, count] = await this.repository.findAndCount();

    return [processsors.map((processor) => new Processor(processor)), count];
  }
}
