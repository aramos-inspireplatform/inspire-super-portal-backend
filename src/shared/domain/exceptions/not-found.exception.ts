import { GeneralExceptionsEnum, HttpStatusEnum } from '~/shared/domain/enums';
import { BaseException } from '~/shared/domain/exceptions';

export class NotFoundException extends BaseException {
  constructor(tag?: string) {
    super(
      tag ?? GeneralExceptionsEnum.Messages.NOT_FOUND,
      HttpStatusEnum.Code.NOT_FOUND,
    );
  }
}
