import {assert} from 'chai';
import Deferred from 'tinyutils/src/Deferred';

import '../../../src/postmessenger';
import controls from './controls';
import PostMessenger from '../../../src/postmessenger/PostMessenger';

const CASE_IFRAME = 'Iframe autoreply';
const CASE_POPUP = 'Popup autoreply';

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

let popupDefers = {};
let popupPromises = [
  'noFilter',
  'plainFilter',
  'complexFilter'
].map((type) => {
  let deferred = new Deferred();
  popupDefers[type] = deferred;

  return deferred.promise;
});

Promise.all(popupPromises).then(() => {
  controls.popup.close();
});

describe('Export', () => {
  it('Add PostMessenger to global scope', () => {
    assert.strictEqual(window.PostMessenger, PostMessenger, 'No PostMessenger constructor in global scope');
  });
});

describe('Nofilter messages (1 messenger, 2 different events)', () => {
  let messenger = new PostMessenger();

  it(CASE_IFRAME, getAutoreplyTest(messenger, 'iframe', 'iframe_autoreply', 'iframe_nofilter'));
  it(CASE_POPUP, getAutoreplyTest(messenger, 'popup', 'popup_autoreply', 'popup_nofilter', popupDefers.noFilter));
});

describe('Plain filter messages (2 different messengers, 1 event)', () => {
  it(CASE_IFRAME, getAutoreplyTest(new PostMessenger({
    filter: 'iframe'
  }), 'iframe', 'autoreply', 'iframe_plain_filter'));

  it(CASE_POPUP, getAutoreplyTest(new PostMessenger({
    filter: 'popup'
  }), 'popup', 'autoreply', 'popup_plain_filter', popupDefers.plainFilter));
});

describe('Complex filter messages (2 different messengers, 1 event)', () => {
  it(CASE_IFRAME, getAutoreplyTest(new PostMessenger({
    filter: {
      session: 'testing',
      control: 'iframe'
    }
  }), 'iframe', 'autoreply', 'iframe_complex_filter'));

  it(CASE_POPUP, getAutoreplyTest(new PostMessenger({
    filter: {
      session: 'testing',
      control: 'popup'
    }
  }), 'popup', 'autoreply', 'popup_complex_filter', popupDefers.complexFilter));
});
