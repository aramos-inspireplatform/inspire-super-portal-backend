import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import FormData from 'form-data';
import { lastValueFrom, map } from 'rxjs';
import { IReadmeDocsService, ISendDocsParams } from '~/readme-docs/interfaces';

export class ReadmeDocsService implements IReadmeDocsService {
  private readonly httpService = new HttpService();

  private readonly logger = new Logger(ReadmeDocsService.name);

  async sendDocs(params: ISendDocsParams) {
    try {
      const { swaggerJson, apiId } = params;

      const data = new FormData();
      data.append('spec', swaggerJson, {
        contentType: 'application/json',
      });

      await lastValueFrom(
        this.httpService
          .put(
            `https://dash.readme.com/api/v1/api-specification/${apiId}`,
            data,
            {
              headers: {
                Authorization: `Basic ${process.env.README_API_KEY}`,
                ...data.getHeaders(),
              },
            },
          )
          .pipe(
            map((response) => {
              this.logger.log(`API ${response.data.title} updated!`);
              return response.data;
            }),
          ),
      );
    } catch (error) {
      this.logger.error(`API docs was not updated!`);
    }
  }
}
