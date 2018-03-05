# Message queueing demo

You can read more about Ably Reactor Queues at https://www.ably.io/documentation/general/queues

**To run this demo:**

0. If you haven't already, set up an account at ably.io

1. Go to your account dashboard on ably.io, click 'Manage app' for the app you want to try this on, go to the 'Queues' tab, and follow the instructions to set up a queue.

2. Once you've set up a queue, go to the 'Reactor' tab and create a rule of type 'Reactor Queues', which will define how messages will be directed into your queue.

3. Make sure the API key you're using to consume has the capabilities to consume from queues (and the one you're using to publish has the capabilities to publish to the channel you'll be using). If you're not sure, go to the 'API Keys' tab, click 'Settings' for your key, and make sure 'Resource restrictions' to 'None'.

4. Clone this repo, run `npm install`, and run the queue consumer app as `API_KEY=<your api key> node queue-consumer.js`

5. Publish a message to a channel that you configured to send messages to your queue (that is, that matches the channel filter you set when creating the queue rule). If you're not sure how to publish a message to a channel, you can do it from the 'Dev console' tab, or using the following curl command, replacing `<CHANNEL>` and `<API_KEY>` with the channel name and your api key.
```
curl -X POST https://rest.ably.io/channels/<CHANNEL>/messages \
  -u "<API_KEY>" \
  -H "Content-Type: application/json" \
  --data '{ "name": "message-name", "data": "some example data" }'
```

6. See a message appear in the terminal running the queue-consumer.js script.
