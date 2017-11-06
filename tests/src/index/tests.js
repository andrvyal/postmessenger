import {assert} from 'chai';
import Deferred from 'tinyutils/src/Deferred';

import '../../../src/postmessenger';
import controls from './controls';
import PostMessenger from '../../../src/postmessenger/PostMessenger';

const CASE_IFRAME = 'Iframe autoreply';
const CASE_CHILD = 'Child window autoreply';

let getAutoreplyTest = (messenger, control, message, expect, deferred) => {
  return (done) => {
    messenger.on(message, (event) => {
      assert.strictEqual(event.data, expect);
      done();

      if (deferred) {
        deferred.resolve();
      }
    });

    messenger.post(controls[control], 'message');
  };
};

let childDefers = {};
let childPromises = [
  'noFilter',
  'plainFilter',
  'complexFilter'
].map((type) => {
  let deferred = new Deferred();
  childDefers[type] = deferred;

  return deferred.promise;
});

Promise.all(childPromises).then(() => {
  controls.child.close();
});

describe('Export', () => {
  it('Add PostMessenger to global scope', () => {
    assert.strictEqual(window.PostMessenger, PostMessenger, 'No PostMessenger constructor in global scope');
  });
});

describe('Nofilter messages (1 messenger, 2 different events)', () => {
  let messenger = new PostMessenger();

  it(CASE_IFRAME, getAutoreplyTest(messenger, 'iframe', 'iframe_autoreply', 'iframe_nofilter'));
  it(CASE_CHILD, getAutoreplyTest(messenger, 'child', 'child_autoreply', 'child_nofilter', childDefers.noFilter));
});

describe('Plain filter messages (2 different messengers, 1 event)', () => {
  it(CASE_IFRAME, getAutoreplyTest(new PostMessenger({
    filter: 'iframe'
  }), 'iframe', 'autoreply', 'iframe_plain_filter'));

  it(CASE_CHILD, getAutoreplyTest(new PostMessenger({
    filter: 'child'
  }), 'child', 'autoreply', 'child_plain_filter', childDefers.plainFilter));
});

describe('Complex filter messages (2 different messengers, 1 event)', () => {
  it(CASE_IFRAME, getAutoreplyTest(new PostMessenger({
    filter: {
      session: 'testing',
      control: 'iframe'
    }
  }), 'iframe', 'autoreply', 'iframe_complex_filter'));

  it(CASE_CHILD, getAutoreplyTest(new PostMessenger({
    filter: {
      session: 'testing',
      control: 'child'
    }
  }), 'child', 'autoreply', 'child_complex_filter', childDefers.complexFilter));
});
