import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  ClassConstructor,
  ClassTransformOptions,
  Exclude,
  Expose,
  instanceToInstance,
  plainToInstance,
} from 'class-transformer';

export class BaseDto {
  static locale: string;

  @Expose()
  @ApiProperty({
    example: '0f667734-0a60-4cb6-9356-1aad274fe85e',
  })
  id: string;

  @ApiHideProperty()
  @Exclude()
  alternativeid: number;

  createdDate: Date;

  @ApiHideProperty()
  @Exclude()
  updateddate: Date;

  @ApiHideProperty()
  @Exclude()
  deleteddate: Date;

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
