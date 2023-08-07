import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IgnoredPropertyName } from '~/shared/infra/nestjs/decorators/ignore-interceptor';

export interface Response<T> {
  statusCode: number;
  body: {
    status: string;
    data: T;
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // eslint-disable-next-line dot-notation
    const isIgnored = ctx.getHandler()[IgnoredPropertyName];

    if (isIgnored) return next.handle();

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: 200,
          body: {
            status: 'success',
            data,
          },
        };
      }),
    );
  }
}
