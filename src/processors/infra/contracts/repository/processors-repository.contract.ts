import { Processor } from '~/processors/domain/entity/processor.entity';

export interface IProcessorsRepository {
  findAll(): IProcessorsRepository.FindAllResult;
  find(
    input: IProcessorsRepository.FindInput,
  ): IProcessorsRepository.FindResult;
}

export namespace IProcessorsRepository {
  export type FindAllResult = Promise<[Array<Processor>, number]>;
  export type FindResult = Promise<Processor>;
  export type FindInput = { id: string };
}
