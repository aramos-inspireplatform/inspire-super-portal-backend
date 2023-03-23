export interface ISendDocsParams {
  swaggerJson: string;
  apiId: string;
}

export interface IReadmeDocsService {
  sendDocs(params: ISendDocsParams): Promise<void>;
}
