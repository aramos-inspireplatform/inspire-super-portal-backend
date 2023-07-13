import { NotFoundException as NotFoundExceptionNestJs } from '@nestjs/common';
import { GeneralExceptionsConstants } from '~/shared/domain/common/general-exceptions.enum';

export class NotFoundException extends NotFoundExceptionNestJs {
  constructor(tag?: string) {
    super(tag ?? GeneralExceptionsConstants.NOT_FOUND);
  }
}
