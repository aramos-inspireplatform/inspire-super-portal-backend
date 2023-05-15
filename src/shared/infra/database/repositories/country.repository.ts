import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Country } from '~/countries/domain/entities/country.entity';
import { ICountryRepository } from '~/countries/infra/contracts/repositories/country-repository.contract';
import { Countries } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class CountryRepository implements ICountryRepository {
  repository: Repository<Countries>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository<Countries>(Countries);
  }

  async listAndCount(): ICountryRepository.ListAllResult {
    const [countries, total] = await this.repository
      .createQueryBuilder('countries')
      .getManyAndCount();
    return [countries.map((country) => new Country(country)), total];
  }
}
