import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class PasswordAndConfirmationPasswordShouldBeEqualException extends UnauthorizedException {
  constructor() {
    super(PasswordAndConfirmationPasswordShouldBeEqualException.MESSAGE);
  }
}

export namespace PasswordAndConfirmationPasswordShouldBeEqualException {
  export const MESSAGE =
    'exception:PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME';
  export const STATUS_CODE = HttpStatus.BAD_REQUEST;
  export const ERROR = 'BadRequest';
}
