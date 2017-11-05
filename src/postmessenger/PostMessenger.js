import EventObject from 'tinyutils/src/EventObject';
import Filter from './Filter';

const ORIGIN_ALL = '*';
const PRIVATE = new WeakMap();

export default class PostMessenger {
  constructor({filter, origin = ORIGIN_ALL} = {}) {
    let eventObject = new EventObject();

    if (filter && typeof filter === 'object') {
      filter = Object.freeze(filter);
    }
    let filterMatcher = Filter.getMatcher(filter);

    window.addEventListener('message', (event) => {
      let message = event.data;

      if (
        message &&
        filterMatcher(message.filter) &&
        origin.length &&
        (origin === ORIGIN_ALL || origin.indexOf(event.origin) >= 0)
      ) {
        eventObject.trigger(message.name, {
          data: message.data,
          lastEventId: event.lastEventId,
          origin: event.origin,
          ports: event.ports,
          source: event.source
        });
      }
    });

    PRIVATE.set(this, {
      eventObject,
      filter,
      origin
    });
  }

  off(name, handler) {
    let {eventObject} = PRIVATE.get(this);

    eventObject.off(name, handler);
  }

  on(name, handler) {
    let {eventObject} = PRIVATE.get(this);

    eventObject.on(name, handler);
  }

  post(target, name, data) {
    let {filter, origin} = PRIVATE.get(this);

    target.postMessage({
      data,
      filter,
      name
    }, origin);
  }
}
