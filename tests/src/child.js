import PostMessenger from '../../src/postmessenger/PostMessenger';

let initAutoreply = (messenger, message, reply) => {
  messenger.on('message', (event) => {
    messenger.post(event.source, message, reply);
  });
};

initAutoreply(new PostMessenger(), 'child_autoreply', 'child_nofilter');

initAutoreply(new PostMessenger({
  filter: 'child'
}), 'autoreply', 'child_plain_filter');

initAutoreply(new PostMessenger({
  filter: {
    session: 'testing',
    control: 'child'
  }
}), 'autoreply', 'child_complex_filter');
