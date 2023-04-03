import { HttpStatus, BadRequestException } from '@nestjs/common';

export class InvalidResetPasswordSecurityToken extends BadRequestException {
  constructor() {
    super(InvalidResetPasswordSecurityToken.MESSAGE);
  }
}

export namespace InvalidResetPasswordSecurityToken {
  export const MESSAGE = 'exception:INVALID_RESET_PASSWORD_SECURITY_TOKEN';
  export const STATUS_CODE = HttpStatus.BAD_REQUEST;
  export const ERROR = 'Bad Request';
}
