'use strict';

// Load internal modules
const SqsStrategy = require('./strategies/sqs');
const StubStrategy = require('./strategies/stub');

class Queue {
  constructor(queues, options, simulate) {
    this._queues = queues;

    const settings = Object.assign({}, options, {
      apiVersion: '2012-11-05'
    });

    this._strategy = simulate ? new StubStrategy(settings) : new SqsStrategy(settings);
  }

  sendMessage(queue, message, options) {
    return new Promise((resolve, reject) => {
      const params = {
        QueueUrl: this._queues[queue],
        MessageBody: typeof message === 'object' ? JSON.stringify(message) : message
      };

      this._strategy.sendMessage(params)
        .then((data) => {
          resolve({ id: data.MessageId });
        })
        .catch(reject);
    });
  }
}

module.exports = Queue;
