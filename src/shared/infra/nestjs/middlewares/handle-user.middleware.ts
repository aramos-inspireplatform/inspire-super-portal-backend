import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { IUserRepository } from '~/shared/infra/database/repositories/contracts';
import { UsersEntity } from '~/users/domain/entities/users.entity';
import { UserRepositoriesSymbols } from '~/shared/infra/database/ioc/providers/users/users-repositories.symbols';

@Injectable()
export class HandleUserMiddleware implements NestInterceptor {
  constructor(
    @Inject(UserRepositoriesSymbols.GLOBAL_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    //
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) {
      const user: UserAuthDto = request.userAuth;
      user &&
        (await this.userRepository.save(
          new UsersEntity({
            id: user.userId,
            email: user.userEmail,
            firstName: user.userFirstName,
            lastName: user.userLastName,
          }),
        ));
    }

    return next.handle();
  }
}
