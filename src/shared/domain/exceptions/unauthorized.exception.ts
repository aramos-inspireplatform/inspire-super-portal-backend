import { GeneralExceptionsEnum, HttpStatusEnum } from '~/shared/domain/enums';
import { BaseException } from '~/shared/domain/exceptions';

export class UnauthorizedException extends BaseException {
  constructor() {
    super(
      GeneralExceptionsEnum.Messages.UNAUTHORIZED,
      HttpStatusEnum.Code.UNAUTHORIZED,
    );
  }
}
