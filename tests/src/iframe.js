import PostMessenger from '../../src/postmessenger/PostMessenger';

let initEcho = (messenger) => {
  messenger.on('message', (event) => {
    messenger.post(event.source, 'echo', event.data);
  });
};

initEcho(new PostMessenger());

initEcho(new PostMessenger({
  channel: 'iframe'
}));
