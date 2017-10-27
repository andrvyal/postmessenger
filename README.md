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


## Usage

### Parent window -> Iframe example

[Plunker demo](https://plnkr.co/edit/0ReoQFHeYTTAQItOIJ6f?p=preview)

Parent window

```js
var messenger = new PostMessenger();
messenger.post(iframe.contentWindow, 'message', 'parent window -> iframe');
```

Iframe

```js
var messenger = new PostMessenger();
messenger.on('message', function(event) {
  comsole.log(event.data); // parent window -> iframe
});
```

### Parent window <-> Iframe and Parent window <-> Child window example

[Plunker demo](https://plnkr.co/edit/q6dMLKuotnV5lgyF2ebo?p=preview)

Parent window

```js
var iframeMessenger = new PostMessenger({
  channel: 'iframe'
});
iframeMessenger.on('confirm', function(event) {
  comsole.log(event.data); // iframe -> parent window
});
iframeMessenger.post(iframe.contentWindow, 'message', 'parent window -> iframe');

var childMessenger = new PostMessenger({
  channel: 'child'
});
childMessenger.on('confirm', function(event) {
  comsole.log(event.data); // child window -> parent window
});
childMessenger.post(childWindow, 'message', 'parent window -> child window');
```

Iframe

```js
var messenger = new PostMessenger({
  channel: 'iframe'
});
messenger.on('message', function(event) {
  comsole.log(event.data); // parent window -> iframe
  messenger.post(event.source, 'confirm', 'iframe -> parent window');
});
```

Child window

```js
var messenger = new PostMessenger({
  channel: 'child'
});
messenger.on('message', function(event) {
  comsole.log(event.data); // parent window -> child window
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

`params.channel` {any} - Optional parameter. Channel is a kind of a filter: messenger sends messages with the channel specified and receives messages with the same channel only. Default channel is `"default"`.

`params.origin` {string} - Optional parameter. Specifies an origin that should match the URL of the target window. Default origin is `"*"`.

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
function messageHandler(event) {
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
