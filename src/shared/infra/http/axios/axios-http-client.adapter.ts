import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

@Injectable()
export class AxiosHttpClientAdapter implements IHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async post<TResponse, TConfig = any>(
    url: string,
    data?: any,
    config?: TConfig,
  ): Promise<IHttpClient.HttpClientResponse<TResponse>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, config),
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.logError(axiosError, 'post');
      throw new HttpException(
        (axiosError.response.data as any).body,
        axiosError.response.status,
        {
          cause: axiosError.cause,
          description: axiosError.name,
        },
      );
    }
  }

  private logError(error: any, method: string) {
    Logger.error(
      JSON.stringify(error, null, 4),
      `AxiosHttpClientAdapter.${method}`,
    );
  }
}
