import { HttpStatus, NotFoundException } from '@nestjs/common';

export class RequestModuleAttemptNotFound extends NotFoundException {
  constructor() {
    super(RequestModuleAttemptNotFound.MESSAGE);
  }
}

export namespace RequestModuleAttemptNotFound {
  export const MESSAGE = 'exception:REQUEST_MODULE_ATTEMPT_NOT_FOUND';
  export const STATUS_CODE = HttpStatus.NOT_FOUND;
  export const ERROR = 'NotFound';
}
