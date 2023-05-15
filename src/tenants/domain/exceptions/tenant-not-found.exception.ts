import { HttpStatus, NotFoundException } from '@nestjs/common';

export class TenantNotFoundException extends NotFoundException {
  constructor() {
    super(TenantNotFoundException.MESSAGE);
  }
}

export namespace TenantNotFoundException {
  export const MESSAGE = 'exception:TENANT_NOT_FOUND_EXCEPTION';
  export const STATUS_CODE = HttpStatus.NOT_FOUND;
  export const ERROR = 'NotFound';
}
