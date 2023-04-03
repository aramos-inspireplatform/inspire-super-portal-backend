import {
  HttpStatus,
  UnauthorizedException as NestJSUnauthorizedException,
} from '@nestjs/common';

export class UnauthorizedException extends NestJSUnauthorizedException {
  constructor() {
    super(UnauthorizedException.MESSAGE);
  }
}

export namespace UnauthorizedException {
  export const MESSAGE = 'exception:UNAUTHORIZED';
  export const STATUS_CODE = HttpStatus.UNAUTHORIZED;
  export const ERROR = 'Unauthorized';
}
