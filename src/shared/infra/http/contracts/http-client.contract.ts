export type IHttpClient = {
  post<TResponse, TConfig = any>(
    url: string,
    data?: any,
    config?: TConfig,
  ): Promise<IHttpClient.HttpClientResponse<TResponse>>;

  // TODO: implements when need
  // get<TResponse = any, TConfig = any>(
  //   url: string,
  //   config?: TConfig,
  // ): Promise<IHttpClient.HttpClientResponse<TResponse>>;

  // delete<TResponse = any, TConfig = any>(
  //   url: string,
  //   config?: TConfig,
  // ): Promise<IHttpClient.HttpClientResponse<TResponse>>;

  // head<TResponse = any, TConfig = any>(
  //   url: string,
  //   config?: TConfig,
  // ): Promise<IHttpClient.HttpClientResponse<TResponse>>;

  // put<TResponse = any, TConfig = any>(
  //   url: string,
  //   data?: any,
  //   config?: TConfig,
  // ): Promise<IHttpClient.HttpClientResponse<TResponse>>;

  // patch<TResponse = any, TConfig = any>(
  //   url: string,
  //   data?: any,
  //   config?: TConfig,
  // ): Promise<IHttpClient.HttpClientResponse<TResponse>>;
};

export namespace IHttpClient {
  export type IHttpResponse<T = any, D = any> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: D;
    request?: any;
  };

  export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

  type HttpHeaderValue = string | string[] | number | boolean | null;

  interface RawHttpHeaders {
    [key: string]: HttpHeaderValue;
  }

  export type HttpClientResponse<TResponse> = IHttpResponse<TResponse> | Error;

  export type HttpRequestConfig<D = any> = {
    url?: string;
    method?: Method | string;
    baseURL?: string;
    headers?: RawHttpHeaders;
    params?: any;
    data?: D;
  };
}
