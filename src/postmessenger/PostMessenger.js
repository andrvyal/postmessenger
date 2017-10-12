import EventObject from '../../node_modules/tinyutils/src/EventObject';

const DEFAULT_CHANNEL = 'default';
const ORIGIN_ALL = '*';
const PRIVATE = new WeakMap();

export default class PostMessenger {
  constructor({channel = DEFAULT_CHANNEL, origin = ORIGIN_ALL} = {}) {
    let eventObject = new EventObject();

    window.addEventListener('message', (event) => {
      let message = event.data;

      if (
        message &&
        message.channel === channel &&
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
      channel,
      eventObject,
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
    let {channel, origin} = PRIVATE.get(this);

    target.postMessage({
      channel,
      data,
      name
    }, origin);
  }
}
