import { NotFoundException } from '@nestjs/common';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';

export class ListOneRequestUseCase {
  constructor(private readonly requestRepository: IRequestRepository) {}

  async handle(attrs: ListOneRequestUseCase.InputAttrs) {
    const request = await this.requestRepository.findById(attrs.id);
    if (!request) throw new NotFoundException('exception:REQUEST_NOT_FOUND');
    return request;
  }
}

export namespace ListOneRequestUseCase {
  export type InputAttrs = { id: string };
}
