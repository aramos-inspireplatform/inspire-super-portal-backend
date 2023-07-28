import { GeneralExceptionsEnum, HttpStatusEnum } from '~/shared/domain/enums';
import { BaseException } from '~/shared/domain/exceptions';

export class ForbiddenException extends BaseException {
  constructor() {
    super(
      GeneralExceptionsEnum.Messages.FORBIDDEN,
      HttpStatusEnum.Code.FORBIDDEN,
    );
  }
}
