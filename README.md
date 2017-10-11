# PostMessenger

Tiny wrapper for window.postMessage()


## API Reference


### *PostMessenger()*

#### Syntax

```js
new PostMessenger([params])
````

##### Parameters

`params.channel`

`params.origin`

#### Description

...

#### Examples

...


### PostMessenger.prototype.*off()*

#### Syntax

```js
messenger.off(name, handler)
````

##### Parameters

`name`

`handler`

#### Description

...

#### Examples

...


### PostMessenger.prototype.*on()*

#### Syntax

```js
messenger.on(name, handler)
````

##### Parameters

`name`

`handler` A function that receives message event object.

An event object contains the following properties:

`event.data` The data passed from the message emitter.

`event.lastEventId` A DOMString representing a unique ID for the event. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.origin` A USVString representing the origin of the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.ports` An array of MessagePort objects representing the ports associated with the channel the message is being sent through (where appropriate, e.g. in channel messaging or when sending a message to a shared worker). ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.source` A MessageEventSource (which can be a WindowProxy, MessagePort, or ServiceWorker object) representing the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

#### Description

...

#### Examples

...


### PostMessenger.prototype.*post()*

#### Syntax

```js
messenger.post(target, name, data)
````

##### Parameters

`target`

`name`

`data`

#### Description

...

#### Examples

...
