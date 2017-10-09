const PRIVATE = new WeakMap();

export default class EventObject {
  constructor() {
    PRIVATE.set(this, {
      handlers: Object.create(null)
    });
  }

  off(event, handler) {
    let {handlers} = PRIVATE.get(this);

    if (handlers[event]) {
      let index = handlers[event].indexOf(handler);
      if (index >= 0) {
        handlers[event].splice(index, 1);

        if (!handlers[event].length) {
          delete handlers[event];
        }
      }
    }
  }

  on(event, handler) {
    let {handlers} = PRIVATE.get(this);

    if (!handlers[event]) {
      handlers[event] = [];
    }

    handlers[event].push(handler);
  }

  trigger(event, data) {
    let {handlers} = PRIVATE.get(this);

    if (handlers[event]) {
      handlers[event].forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
}
