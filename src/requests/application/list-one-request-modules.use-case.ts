import { NotFoundException } from '@nestjs/common';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';

export class ListOneRequestModuleUseCase {
  constructor(
    private readonly requestModuleRepository: IRequestModuleRepository,
  ) {}

  async handle(attrs: ListOneRequestModuleUseCase.InputAttrs) {
    const requestModule = await this.requestModuleRepository.findById(
      attrs.requestModuleId,
    );
    if (!requestModule)
      throw new NotFoundException('exception:REQUEST_MODULE_NOT_FOUND');
    return requestModule;
  }
}

export namespace ListOneRequestModuleUseCase {
  export type InputAttrs = {
    requestModuleId: string;
  };
}
