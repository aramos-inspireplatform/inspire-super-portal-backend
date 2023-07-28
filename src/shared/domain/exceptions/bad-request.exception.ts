import { GeneralExceptionsEnum, HttpStatusEnum } from '~/shared/domain/enums';
import { BaseException } from '~/shared/domain/exceptions';

export class BadRequestException extends BaseException {
  constructor(tag?: string) {
    super(
      tag ?? GeneralExceptionsEnum.Messages.BAD_REQUEST,
      HttpStatusEnum.Code.BAD_REQUEST,
    );
  }
}
