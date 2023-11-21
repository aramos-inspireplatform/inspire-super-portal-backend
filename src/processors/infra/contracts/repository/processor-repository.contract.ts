import { Processor } from '~/processors/domain/entity/processor.entity';

export interface IProcessorRepository {
  findAll(): IProcessorRepository.FindAllResult;
  find(input: IProcessorRepository.FindInput): IProcessorRepository.FindResult;
}

export namespace IProcessorRepository {
  export type FindAllResult = Promise<[Array<Processor>, number]>;
  export type FindResult = Promise<Processor>;
  export type FindInput = { id: string };
}
