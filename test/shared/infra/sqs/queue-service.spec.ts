import { SqsService } from '@nestjs-packages/sqs';
import { QueueService } from '~/shared/infra/sqs/queue.service';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('mock-id'),
}));

describe('QueueService', () => {
  let queueService: QueueService;
  let sqsService: SqsService;

  beforeEach(() => {
    sqsService = {
      send: jest.fn(),
    } as any;

    queueService = new QueueService(sqsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a message to the SQS queue with a unique ID', async () => {
    const messageBody = { foo: 'bar' };
    const queueName = 'my-queue';

    await queueService.sendMessage({ body: messageBody, queueName });

    expect(sqsService.send).toHaveBeenCalledWith(queueName, {
      id: 'mock-id',
      body: messageBody,
      delaySeconds: 0,
    });
  });
});
