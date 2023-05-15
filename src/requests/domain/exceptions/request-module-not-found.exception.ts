import { HttpStatus, NotFoundException } from '@nestjs/common';

export class RequestModuleNotFoundException extends NotFoundException {
  constructor() {
    super(RequestModuleNotFoundException.MESSAGE);
  }
}

export namespace RequestModuleNotFoundException {
  export const MESSAGE = 'exception:REQUEST_MODULE_NOT_FOUND_EXCEPTION';
  export const STATUS_CODE = HttpStatus.NOT_FOUND;
  export const ERROR = 'NotFound';
}
