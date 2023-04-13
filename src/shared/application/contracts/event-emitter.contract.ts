export interface IEventEmitter {
  emit<T = any[]>(event: IEventEmitter.Event, values: T): boolean;
}

export namespace IEventEmitter {
  type event = symbol | string;
  type eventNS = string | event[];
  export type Event = event | eventNS;
}
