# PostMessenger

Tiny wrapper for [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).


## API Reference


### ***PostMessenger()***

PostMessenger constructor. Creates an instance of PostMessenger class.

#### Syntax

```js
var messenger = new PostMessenger(params);
```

##### Parameters

`params` Optional parameter. It is an object that contains the following properties:

`params.channel` Optional parameter. Channel is a kind of a filter: messenger sends messages with the channel specified and receives messages with the same channel only. Default channel is `"default"`.

`params.origin` Optional parameter. Specifies an origin that should match the URL of the target window. Default origin is `"*"`.

#### Examples

##### Create simple messenger

```js
var messenger = new PostMessenger();
messenger.on('testMessage', function(event) {
  // ...
});
```

##### Handle different message types

```js
var contactMessenger = new PostMessenger({
  channel: 'contacts'
});
contactMessenger.on('friendRequest', function(event) {
  // ...
});

var chatMessenger = new PostMessenger({
  channel: 'chats'
});
chatMessenger.on('message', function(event) {
  // ...
});
```


### PostMessenger.prototype.***off()***

Removes handler from the list of message handlers.

#### Syntax

```js
messenger.off(name, handler);
```

##### Parameters

`name` Message name.

`handler` Original message handler function.

#### Examples

##### Remove message handler

```js
var messageHandler = function(event) {
  // handler body
};

messenger.on('testMessage', messageHandler);
// ...
messenger.off('testMessage', messageHandler);
```


### PostMessenger.prototype.***on()***

Adds handler to the list of message handlers.

#### Syntax

```js
messenger.on(name, handler);
```

##### Parameters

`name` Message name.

`handler` Function that receives message event object.

```js
function messageHandler(event) {
  // ...
}
```

An `event` object contains the following properties:

`event.data` The data passed from the message emitter.

`event.lastEventId` A DOMString representing a unique ID for the event. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.origin` A USVString representing the origin of the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.ports` An array of MessagePort objects representing the ports associated with the channel the message is being sent through (where appropriate, e.g. in channel messaging or when sending a message to a shared worker). ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.source` A MessageEventSource (which can be a WindowProxy, MessagePort, or ServiceWorker object) representing the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

#### Examples

##### Handle message

```js
messenger.on('testMessage', function(event) {
  console.log(event.data); // data transferred to the messenger
  console.log(event.origin); // "https://example.com"
  console.log(event.source); // Window object
});
```


### PostMessenger.prototype.***post()***

Posts message to the target window using the parameters passed to the constructor (or their default values).

#### Syntax

```js
messenger.post(target, name, data);
```

##### Parameters

`target` Target window.

`name` Message name.

`data` Data passing to the target.

#### Examples

##### Send simple message from child window to the opener window

```js
var messenger = new PostMessenger();
messenger.post(window.opener, 'testMessage', 'test data');
```

##### Send message from iframe to the parent window

```js
var chatMessenger = new PostMessenger({
  channel: 'chats'
});
chatMessenger.post(window.parent, 'message', {
  text: 'Hello world!',
  timestamp: Date.now()
});
```
