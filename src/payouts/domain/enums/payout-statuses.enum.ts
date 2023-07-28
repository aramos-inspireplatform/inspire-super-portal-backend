export namespace PayoutStatusesEnum {
  export enum Ids {
    DRAFT = 'a2a07174-dfe0-47b7-a43c-d63cea41681f',
    PROCESSED = '2eca46d3-40e3-4555-afa6-d8d52b04fa2e',
    PAID = '6f1342e6-af0e-4642-8e56-cec2efb2303d',
    CANCELED = 'da7327cb-d6bd-4381-8763-6085b6699f40',
    DELETED = 'e9d9daa0-212d-4da4-8ca7-416bdb40aaed',
  }

  export enum Slugs {
    DRAFT = 'draft',
    PROCESSED = 'processed',
    PAID = 'paid',
    CANCELED = 'canceled',
    DELETED = 'deleted',
  }

  export enum Exceptions {
    NOT_FOUND = 'exception:PAYOUT_STATUS_NOT_FOUND',
  }
}
