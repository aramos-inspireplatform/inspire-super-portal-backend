export interface IFindOneCurrencyDao {
  execute(params: IFindOneCurrencyDao.Input): IFindOneCurrencyDao.Output;
}

export namespace IFindOneCurrencyDao {
  export type Input = {
    currencyIsoCode: string;
  };

  export type Output = Promise<Currency>;

  // Additional types
  type Currency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };
}
