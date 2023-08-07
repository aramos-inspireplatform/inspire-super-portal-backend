import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyReply } from 'fastify';
import { GeneralExceptionsEnum } from '~/shared/domain/enums';

import { BaseException } from '~/shared/domain/exceptions';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  private loggerService: Logger;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.loggerService = new Logger();
  }

  checkIfLogsMustBeDisplayed(message: string | string[]): string | null {
    return typeof message === 'object' ? this.parseMessages(message) : message;
  }

  saveLogsOnSentry(status: number, response: any, exception: Error): void {
    if (status === 500 && process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-console
      console.error(response); // LOG RESPONSE ON SENTRY
      // eslint-disable-next-line no-console
      console.error(exception.stack); // LOG ERROR STACK ON SENTRY
      //setExtra('body', response.request.body);
      //setExtra('raw', response.request.raw);
      //captureException(exception);
    }
  }

  parseMessages(messages: string[]) {
    return messages.reduce((acc: any, cur: string) => {
      const key = cur.split(' ').shift();
      const hasKey = Object.keys(acc).includes(key);

      if (!hasKey) {
        acc[key] = [];
      }

      acc[key].push(cur?.replace(key, '').slice(1));
      return acc;
    }, {});
  }

  formatTypeOrmError = (input) =>
    input
      .replace(/"/g, '')
      .replace('Key ', '')
      .split('_')
      .reduce(
        (res, word, i) =>
          i === 0
            ? word.toLowerCase()
            : `${res}${word.charAt(0).toUpperCase()}${word
                .substr(1)
                .toLowerCase()}`,
        '',
      );

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse<FastifyReply>();

    let status: number;
    let body: any;

    if (exception instanceof BaseException) {
      const { statusCode, customMessage, details } = exception;
      status = statusCode;
      body = {
        statusCode,
        message: customMessage,
        error: details,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      body = { message: exception.message };
    }

    this.saveLogsOnSentry(status, response, exception);

    this.loggerService.error(body.message);

    if (exception.name === 'QueryFailedError') {
      const responseBody = {
        statusCode: status,
        message:
          typeof body.message === 'object'
            ? this.parseMessages(body.message)
            : this.checkIfLogsMustBeDisplayed(body.message),
        // body: {
        //   status:
        //     status === HttpStatus.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
        //   errors:
        //     typeof body.message === 'object'
        //       ? this.parseMessages(body.message)
        //       : this.checkIfLogsMustBeDisplayed(body.message),
        // },
      };
      if (response.status)
        return response.status(HttpStatus.BAD_REQUEST).send(responseBody);

      httpAdapter.reply(
        ctx.getResponse(),
        responseBody,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const parsedMessage =
        typeof body.message === 'object'
          ? this.parseMessages(body.message)
          : this.checkIfLogsMustBeDisplayed(body.message);
      const exceptionMessage = this.getHttpStatusExceptionMessage(
        parsedMessage,
        status,
      );

      const responseBody = {
        statusCode: status,
        message: exceptionMessage,
        // body: {
        //   status:
        //     status === HttpStatus.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
        //   errors: exceptionMessage,
        // },
      };

      if (response.status)
        return response.status(status ?? 500).send(responseBody);

      httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
    return null;
  }

  getHttpStatusExceptionMessage(
    parsedMessage: any,
    httpStatus: HttpStatus,
  ): any {
    if (httpStatus === HttpStatus.FORBIDDEN) {
      if (
        typeof parsedMessage === 'string' &&
        !parsedMessage.includes('exception:')
      ) {
        return GeneralExceptionsEnum.Messages.FORBIDDEN;
      }
    }

    return parsedMessage;
  }
}
