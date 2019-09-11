// @flow

import type { Observer } from './types';

export default class Observable {
  observers: Array<Observer>;

  constructor() {
    this.observers = [];
  }

  subscribe(fn: Function, propertiesToSubscribe?: string | Array<string>) {
    this.observers.push({
      callback: fn,
      properties: propertiesToSubscribe
    });
  }

  unsubscribe(fn: Function) {
    if (fn) {
      this.observers = this.observers.filter(item => {
        if (item.callback !== fn) {
          return item;
        }
        return null;
      });
    } else {
      this.observers = [];
    }
  }

  next(o: any, property: string, thisObj: any) {
    var scope = thisObj || window;
    this.observers.forEach(item => {
      // filter by subscribed properties
      if (item.properties === undefined) {
        item.callback.call(scope, o);
      } else if (
        item.properties instanceof Array &&
        item.properties.length &&
        item.properties.includes(property)
      ) {
        item.callback.call(scope, o);
      } else if (
        typeof item.properties === 'string' &&
        item.properties &&
        item.properties === property
      ) {
        item.callback.call(scope, o);
      }
    });
  }
}
