import { DataSource, Repository } from 'typeorm';
import { IFindOneCurrencyDao } from '~/currencies/application/daos/find-one-currency.dao.contract';
import { CurrenciesEntity } from '~/currencies/domain/entities/currencies.entity';
import { Currencies } from '~/shared/infra/database/entities';

export class FindOneCurrencyDao implements IFindOneCurrencyDao {
  private currencyRepository: Repository<CurrenciesEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.currencyRepository =
      this.dataSource.getRepository<CurrenciesEntity>(Currencies);
  }

  async execute(attrs: IFindOneCurrencyDao.Input): IFindOneCurrencyDao.Output {
    const query = this.currencyRepository
      .createQueryBuilder('currencies')
      .select([
        'currencies.id',
        'currencies.name',
        'currencies.isoCode',
        'currencies.symbol',
      ])
      .where('currencies.isoCode = :currencyIsoCode', {
        currencyIsoCode: attrs.currencyIsoCode,
      });

    const currency = await query.getOne();

    return currency
      ? {
          id: currency.id,
          name: currency.name,
          isoCode: currency.isoCode,
          symbol: currency.symbol,
        }
      : null;
  }
}
