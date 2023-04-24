export interface IQueueService {
  sendMessage(attrs: IQueueService.Input): IQueueService.Result;
}

export namespace IQueueService {
  export type Input<TBody = any> = {
    body: TBody;
    queueName: string;
  };

  export type Result<TResult = any> = Promise<TResult>;
}
