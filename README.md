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

`handler` A function that receives message event data.

`event.data`

`event.lastEventId`

`event.origin`

`event.ports`

`event.source`

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
