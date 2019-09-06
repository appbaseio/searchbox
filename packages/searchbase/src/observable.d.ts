import { Observer } from './types';

export interface Observable {
  observers: Array<Observer>;

  subscribe: (
    fn: Function,
    propertiesToSubscribe?: string | Array<string>
  ) => void;

  unsubscribe: (fn: Function) => void;

  next: (o: any, property: string, thisObj: any) => void;
}
