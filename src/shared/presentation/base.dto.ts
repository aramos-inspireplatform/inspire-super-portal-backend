import { ApiHideProperty } from '@nestjs/swagger';
import {
  ClassConstructor,
  ClassTransformOptions,
  Exclude,
  Expose,
  instanceToInstance,
  plainToClass,
} from 'class-transformer';

interface Options extends ClassTransformOptions {
  locale: string;
}

export class BaseDto {
  static locale: string;

  @Expose()
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

  public static factory<T, R>(
    ResponseDto: ClassConstructor<T>,
    plainResponseData: R,
    options?: Options,
  ): T {
    BaseDto.locale = options?.locale;

    const updatedResponseData = plainToClass<T, R>(
      ResponseDto,
      plainResponseData,
      {
        ignoreDecorators: true,
      },
    );

    return instanceToInstance(updatedResponseData, {
      ...options,
      excludeExtraneousValues: true,
    });
  }
}
