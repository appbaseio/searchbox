import { Observer } from './types';

export interface Observable {
  observers: Array<Observer>;
}
