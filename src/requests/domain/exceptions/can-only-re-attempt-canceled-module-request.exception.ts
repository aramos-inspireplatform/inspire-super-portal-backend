import { BadRequestException, HttpStatus } from '@nestjs/common';

export class CanOnlyReAttemptCanceledModuleRequest extends BadRequestException {
  constructor() {
    super(CanOnlyReAttemptCanceledModuleRequest.MESSAGE);
  }
}

export namespace CanOnlyReAttemptCanceledModuleRequest {
  export const MESSAGE =
    'exception:CAN_ONLY_RE_ATTEMPT_CANCELED_MODULE_REQUEST';
  export const STATUS_CODE = HttpStatus.BAD_REQUEST;
  export const ERROR = 'BadRequest';
}
