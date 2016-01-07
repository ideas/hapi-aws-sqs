'use strict';

// Load external modules
const Aws = require('aws-sdk');

class SqsStrategy {
  constructor(options) {
    this._sqs = new Aws.SQS(options);
  }

  sendMessage(params) {
    return new Promise((resolve, reject) => {
      this._sqs.sendMessage(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }
}

module.exports = SqsStrategy;
