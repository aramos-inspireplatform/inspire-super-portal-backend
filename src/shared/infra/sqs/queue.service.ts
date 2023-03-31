import { SqsService } from '@nestjs-packages/sqs';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class QueueService {
  constructor(private readonly sqsService: SqsService) {}

  public async sendMessage({
    body,
    queueName,
  }: {
    body: any;
    queueName: string;
  }) {
    return this.sqsService.send(queueName, {
      id: randomUUID(),
      body,
      delaySeconds: 0,
    });
  }
}
