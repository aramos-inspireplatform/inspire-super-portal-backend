import { GeneralExceptionsEnum, HttpStatusEnum } from '~/shared/domain/enums';
import { BaseException } from '~/shared/domain/exceptions';

export class InternalServerErrorException extends BaseException {
  constructor() {
    super(
      GeneralExceptionsEnum.Messages.INTERNAL_SERVER_ERROR,
      HttpStatusEnum.Code.INTERNAL_SERVER_ERROR,
    );
  }
}
