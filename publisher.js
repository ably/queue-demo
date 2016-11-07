const Ably = require('ably'),
  crypto = require('crypto'),
  inspect = require('util').inspect,
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const API_KEY = process.env.API_KEY,
  CHANNEL = 'queue:example-channel';

const realtime = new Ably.Realtime({key: API_KEY, log: {level: 2}}),
  channel = realtime.channels.get(CHANNEL);

realtime.connection.on('connected', () => {
  channel.attach(() => {
    prompt();
  });
});

function prompt() {
  rl.question('Press enter to publish a test message', () => {
    channel.publish('message-name', {some: ['json', 'data']}, (err) => {
      console.log(err ? inspect(err) : 'Published successfully');
      prompt();
    });
  });
}
