import PostMessenger from '../../../src/postmessenger/PostMessenger';

let initAutoreply = (messenger, message, reply) => {
  messenger.on('message', (event) => {
    messenger.post(event.source, message, reply);
  });
};

export default (control) => {
  initAutoreply(new PostMessenger(), control + '_autoreply', control + '_nofilter');

  initAutoreply(new PostMessenger({
    filter: control
  }), 'autoreply', control + '_plain_filter');

  initAutoreply(new PostMessenger({
    filter: {
      session: 'testing',
      control
    }
  }), 'autoreply', control + '_complex_filter');
};
