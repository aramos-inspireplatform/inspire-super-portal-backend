import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Processor } from '~/processors/domain/entity/processor.entity';
import { IProcessorRepository } from '~/processors/infra/contracts/repository/processor-repository.contract';
import { Processors } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class ProcessorsRepository implements IProcessorRepository {
  repository: Repository<Processors>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository<Processors>(Processors);
  }

  async findAll(): IProcessorRepository.FindAllResult {
    // TODO: verificar se vamos fazer esse filtro: { where: { isActive: true } }
    const [processsors, count] = await this.repository.findAndCount();

    return [processsors.map((processor) => new Processor(processor)), count];
  }

  async find(
    input: IProcessorRepository.FindInput,
  ): IProcessorRepository.FindResult {
    const processsor = await this.repository.findOne({
      where: {
        integrationCode: input.id,
      },
    });
    return new Processor(processsor);
  }
}
