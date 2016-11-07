# Message queueing demo

To run this demo:

0. If you haven't already, set up an account at ably.io

1. Contact Ably (email support@ably.io, or use the live chat at ably.io) and ask us to enable queueing on your app

2. Give an api key the capabilities to consume from queues: go to your account dashboard, click 'Manage App' on the app you'll be using, go to the 'API Keys' tab, click 'Settings' for the key you want to use to consume messages, select "Selected channels", enter `*,[queue]*`, and click 'Save'. (The `*` wildcards over all channels on your app, the `[queue]*` over all queues)

2. Clone this repo and run `npm install`

3. Run the queue consumer as `API_KEY=<your api key> node queue-consumer.js`

4. Publish a message to a channels that's configured to send messages to your queue, or run  `API_KEY=<your api key> node publisher.js` to run a quick interactive script that can publish a test message to the `queue:example-channel` channel

5. See a message appear in the terminal running the queue-consumer.js script

#### Things to note

- By default, messages are sent to queues as JSON, for ease of consuming. If you have large binary payloads, you can ask us to send messages to queues encoded with MessagePack, which is much more efficient for binary data. Note that you'll have to replace the `JSON.parse` step in queue-consumer.js with a messagepack decoder.

- By default, messages are 'enveloped': they are sent to the queue wrapped in an Ably protocol message, which contains all the metadata for that message. You can ask us to disable enveloping, in which case the content of the queue item will be the raw payload data.
