# PostMessenger

Tiny wrapper for [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).


## Install

### NPM

```shell
npm install https://github.com/andrvyal/postmessenger.git
```

or just

```shell
npm install andrvyal/postmessenger
```


## Examples

### Parent window -> Iframe

[Plunker demo](https://plnkr.co/edit/7RvHxM2R6LFV78vhvkTk?p=preview)

Parent window

```js
var messenger = new PostMessenger();
messenger.post(iframe.contentWindow, 'testMessage', 'parent window -> iframe');
```

Iframe

```js
var messenger = new PostMessenger();
messenger.on('testMessage', function(event) {
  console.log(event.data); // parent window -> iframe
});
```

### Parent window <-> Iframe and Parent window <-> Child window

[Plunker demo](https://plnkr.co/edit/fm2c3ZAzZ4G1M5B8a1Q8?p=preview)

Parent window

```js
var iframeMessenger = new PostMessenger({
  filter: 'iframe'
});
iframeMessenger.on('confirm', function(event) {
  console.log(event.data); // iframe -> parent window
});
iframeMessenger.post(iframe.contentWindow, 'testMessage', 'parent window -> iframe');

var childMessenger = new PostMessenger({
  filter: 'child'
});
childMessenger.on('confirm', function(event) {
  console.log(event.data); // child window -> parent window
});
childMessenger.post(childWindow, 'testMessage', 'parent window -> child window');
```

Iframe

```js
var messenger = new PostMessenger({
  filter: 'iframe'
});
messenger.on('testMessage', function(event) {
  console.log(event.data); // parent window -> iframe
  messenger.post(event.source, 'confirm', 'iframe -> parent window');
});
```

Child window

```js
var messenger = new PostMessenger({
  filter: 'child'
});
messenger.on('testMessage', function(event) {
  console.log(event.data); // parent window -> child window
  messenger.post(event.source, 'confirm', 'child window -> parent window');
});
```


## API Reference

- [PostMessenger()](#postmessenger-1)
- [PostMessenger.prototype.off()](#postmessengerprototypeoff)
- [PostMessenger.prototype.on()](#postmessengerprototypeon)
- [PostMessenger.prototype.post()](#postmessengerprototypepost)


### ***PostMessenger()***

PostMessenger constructor. Creates an instance of PostMessenger class.

#### Syntax

```js
var messenger = new PostMessenger(params);
```

##### Parameters

`params` {object} - Optional parameter. It is an object that contains the following properties:

`params.filter` {any} - Optional parameter. Messenger sends messages with the filter specified and receives messages with the same filter only. It receives messages with empty filter only if the filter is not specified. Could be plain (primitive value, such as string or number) or complex (object). All fields of the complex filter should match the fields of received messages.

`params.origin` {string} - Optional parameter. Specifies an origin that should match the URL of the target window. Default origin is `"*"`.

#### Examples

##### Simple messenger

Parent window

```js
var messenger = new PostMessenger();
messenger.on('testMessage', function(event) {
  console.log(event.data); // iframe -> parent window
});
```

Iframe

```js
var messenger = new PostMessenger();
messenger.post(window.parent, 'testMessage', 'iframe -> parent window');
```

##### Handle different message types using plain filters

Parent window

```js
var contactMessenger = new PostMessenger({
  filter: 'contacts' // application module
});
contactMessenger.on('testMessage', function(event) {
  console.log(event.data); // contacts iframe -> parent window
});

var chatMessenger = new PostMessenger({
  filter: 'chats' // application module
});
chatMessenger.on('testMessage', function(event) {
  console.log(event.data); // chats iframe -> parent window
});
```

Contacts iframe

```js
var messenger = new PostMessenger({
  filter: 'contacts' // application module
});
messenger.post(window.parent, 'testMessage', 'contacts iframe -> parent window');
```

Chats iframe

```js
var messenger = new PostMessenger({
  filter: 'chats' // application module
});
messenger.post(window.parent, 'testMessage', 'chats iframe -> parent window');
```

##### Handle more cases using complex filters

Parent window

```js
var sessionId = 6713509903954036; // some unique ID for this session

var contactMessenger = new PostMessenger({
  filter: {
    session: sessionId,
    type: 'contacts' // application module
  }
});
contactMessenger.on('testMessage', function(event) {
  console.log(event.data); // contacts iframe -> parent window
});

var chatMessenger = new PostMessenger({
  filter: {
    session: sessionId,
    type: 'chats' // application module
  }
});
chatMessenger.on('testMessage', function(event) {
  console.log(event.data); // chats iframe -> parent window
});
```

Contacts iframe

```js
var sessionId = 6713509903954036; // some unique ID for this session
var contactMessenger = new PostMessenger({
  filter: {
    session: sessionId,
    type: 'contacts' // application module
  }
});
contactMessenger.post(window.parent, 'testMessage', 'contacts iframe -> parent window');
```

Chats iframe

```js
var sessionId = 6713509903954036; // some unique ID for this session
var chatMessenger = new PostMessenger({
  filter: {
    session: sessionId,
    type: 'chats' // application module
  }
});
chatMessenger.post(window.parent, 'testMessage', 'chats iframe -> parent window');
```


### PostMessenger.prototype.***off()***

Removes handler from the list of message handlers.

#### Syntax

```js
messenger.off(name, handler);
```

##### Parameters

`name` {string} - Message name.

`handler` {function} - Original message handler function.

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

`name` {string} - Message name.

`handler` {function} - Function that receives message event object.

```js
function handler(event) {
  // ...
}
```

An `event` {object} - object contains the following properties:

`event.data` {any} - The data passed from the message emitter.

`event.lastEventId` {string} - A DOMString representing a unique ID for the event. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.origin` {string} - A USVString representing the origin of the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.ports` {object} - An array of MessagePort objects representing the ports associated with the channel the message is being sent through (where appropriate, e.g. in channel messaging or when sending a message to a shared worker). ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

`event.source` {object} - A MessageEventSource (which can be a WindowProxy, MessagePort, or ServiceWorker object) representing the message emitter. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent))

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

`target` {object} - Target window.

`name` {string} - Message name.

`data` {any} - Data passing to the target.

#### Examples

##### Send simple message from child window to the parent window

```js
var messenger = new PostMessenger();
messenger.post(window.opener, 'testMessage', 'test data');
```

##### Send message from iframe to the parent window

```js
var chatMessenger = new PostMessenger({
  filter: 'chats'
});
chatMessenger.post(window.parent, 'testMessage', {
  text: 'Hello world!',
  timestamp: Date.now()
});
```
