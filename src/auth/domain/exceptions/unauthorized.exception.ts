import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(InvalidCredentialsException.MESSAGE);
  }
}

export namespace InvalidCredentialsException {
  export const MESSAGE = 'exception:INVALID_CREDENTIALS';
  export const STATUS_CODE = HttpStatus.UNAUTHORIZED;
  export const ERROR = 'Unauthorized';
}
