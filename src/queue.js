'use strict';

// Load external modules
const AWS = require('aws-sdk');

class Queue {
  constructor(queues, options) {
    this._queues = queues;

    const defaults = {
      apiVersion: '2012-11-05'
    };

    this._sqs = new AWS.SQS(Object.assign({}, options, defaults));
  }

  sendMessage(queue, message, options) {
    return new Promise((resolve, reject) => {
      const params = {
        MessageBody: typeof message === 'object' ? JSON.stringify(message) : message,
        QueueUrl: this._queues[queue]
      };

      this._sqs.sendMessage(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve({ id: data.MessageId });
      });
    });
  }
}

module.exports = Queue;
