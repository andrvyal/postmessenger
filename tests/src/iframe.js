import PostMessenger from '../../src/postmessenger/PostMessenger';

let initAutoreply = (messenger, message, reply) => {
  messenger.on('message', (event) => {
    messenger.post(event.source, message, reply);
  });
};

initAutoreply(new PostMessenger(), 'iframe_autoreply', 'iframe_nofilter');

initAutoreply(new PostMessenger({
  filter: 'iframe'
}), 'autoreply', 'iframe_plain_filter');

initAutoreply(new PostMessenger({
  filter: {
    session: 'testing',
    control: 'iframe'
  }
}), 'autoreply', 'iframe_complex_filter');
