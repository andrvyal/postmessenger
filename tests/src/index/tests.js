import {assert} from 'chai';
import Deferred from 'tinyutils/src/Deferred';

import '../../../src/postmessenger';
import controls from './controls';
import PostMessenger from '../../../src/postmessenger/PostMessenger';

let getEchoTest = (messenger, control, deferred) => {
  return (done) => {
    let random = Math.random();

    let handler = (event) => {
      messenger.off('echo', handler);
      assert.strictEqual(event.data, random);
      done();

      if (deferred) {
        deferred.resolve();
      }
    };
    messenger.on('echo', handler);

    messenger.post(controls[control], 'message', random);
  };
};

let childSimpleDefer = new Deferred();
let childChannelDefer = new Deferred();
Promise.all([
  childSimpleDefer.promise,
  childChannelDefer.promise
]).then(() => {
  controls.child.close();
});

describe('Export', () => {
  it('Add PostMessenger to global scope', () => {
    assert.strictEqual(window.PostMessenger, PostMessenger, 'No PostMessenger constructor in global scope');
  });
});

describe('Simple messages', () => {
  it('Iframe echo', getEchoTest(new PostMessenger(), 'iframe'));

  it('Child window echo', getEchoTest(new PostMessenger(), 'child', childSimpleDefer));
});

describe('Channel messages', () => {
  it('Iframe echo', getEchoTest(new PostMessenger({
    channel: 'iframe'
  }), 'iframe'));

  it('Child window echo', getEchoTest(new PostMessenger({
    channel: 'child'
  }), 'child', childChannelDefer));
});
