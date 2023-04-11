import { SettlementCurrency } from '~/settlement-currencies/domain/entities/settlement-currencies.entity';

export interface ISettlementCurrenciesRepository {
  findAll(): ISettlementCurrenciesRepository.FindAllResult;
}

export namespace ISettlementCurrenciesRepository {
  export type FindAllResult = Promise<[SettlementCurrency[], number]>;
}
