'use strict';

const amqp = require('amqplib/callback_api'),
  Ably = require('ably'),
  inspect = require('util').inspect;

const API_KEY = process.env.API_KEY;
if(!API_KEY) {
  throw new Error('You need to run this as "API_KEY=<your api key> node queue-consumer.js"');
}

const APP_ID = API_KEY.split('.')[0],
  QUEUE_NAME = process.env.QUEUE_NAME || 'default',
  QUEUE = `${APP_ID}:${QUEUE_NAME}`,
  URL = `amqps://${API_KEY}@us-east-1-a-queue.ably.io:5671/shared`;

function bail(err) {
  console.error(err);
  process.exit(1);
}

amqp.connect(URL, (err, conn) => {
  if (err) bail(err);
  console.log("Connected");

  conn.createChannel((err, ch) => {
    if (err) bail(err);
    console.log("Waiting for messages");

    ch.consume(QUEUE, (item) => {
      const decodedEnvelope = JSON.parse(item.content);
      const messages = Ably.Realtime.Message.fromEncodedArray(decodedEnvelope.messages);

      console.log(`\nConsumed messages on channel ${decodedEnvelope.channel}:`);
      messages.forEach((message) => {
        console.log(` - name: ${inspect(message.name)}, payload: ${inspect(message.data)}`);
      });

      ch.ack(item);
      // can nack with ch.nack(item) and message will be requeued
      // nack with ch.nack(item, false, false) to send the message to the deadletter queue
    });
  });
});
