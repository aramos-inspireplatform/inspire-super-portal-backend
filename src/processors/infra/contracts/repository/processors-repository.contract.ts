import { Processor } from '~/processors/domain/entity/processor';

export interface IProcessorsRepository {
  findAll(): IProcessorsRepository.FindAllResult;
}

export namespace IProcessorsRepository {
  export type FindAllResult = Promise<[Array<Processor>, number]>;
}
