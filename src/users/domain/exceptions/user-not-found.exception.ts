import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('exception:USER_NOT_FOUND');
  }
}
