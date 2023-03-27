import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

interface IParams<TModel extends Type<any>> {
  message?: TModel;
  status?: number;
  description?: string;
  error: string;
}

export const ApiErrorResponse = ({
  message,
  status,
  description,
  error,
}: IParams<any>) => {
  const statusCode = status ?? 400;

  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: 'integer', example: statusCode },
              message: { type: 'string', example: message },
              error: { type: 'string', example: error },
            },
          },
        ],
      },
      status: statusCode,
      description,
    }),
  );
};
