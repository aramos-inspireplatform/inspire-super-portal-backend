import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  ClassConstructor,
  ClassTransformOptions,
  Exclude,
  Expose,
  instanceToInstance,
  plainToInstance,
} from 'class-transformer';

export class BaseTenantDto {
  @ApiProperty({ name: 'integrationCode', example: '61b0dbd5ec727249cd6e2e24' })
  @Expose({ name: 'integrationCode' })
  id: string;

  @ApiHideProperty()
  @Exclude()
  createdDate: Date;

  @ApiHideProperty()
  @Exclude()
  updatedDate: Date;

  @ApiHideProperty()
  @Exclude()
  deletedDate: Date;

  public static factory<T, R, TOut = R extends Array<T> ? T[] : T>(
    ResponseDto: ClassConstructor<T>,
    plainResponseData: R | R[],
    options?: ClassTransformOptions,
  ): TOut {
    const updatedResponseData = plainToInstance<T, R>(
      ResponseDto,
      plainResponseData as any,
      {
        ignoreDecorators: true,
      },
    );

    return instanceToInstance<TOut>(updatedResponseData as any, {
      ...options,
      excludeExtraneousValues: true,
    });
  }
}
