import { Global, Module } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { HttpModule as NestHttpModule } from '@nestjs/axios';

@Module({
  imports: [NestHttpModule.register({})],
  providers: [AxiosHttpClientAdapter],
  exports: [AxiosHttpClientAdapter],
})
@Global()
export class HttpModule {}
