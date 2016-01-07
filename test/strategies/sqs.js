'use strict';

// Load external modules
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const SqsStrategy = require('../../src/strategies/sqs.js');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.describe('SqsStrategy', () => {
  lab.describe('sendMessage', () => {
    lab.it('sends a message', (done) => {
      MockAWS.mock('SQS', 'sendMessage', {
        MessageId: '2c4fc1e3-9598-403c-b4f0-752aa8984800'
      });

      const strategy = new SqsStrategy({ region: 'region-1' });

      const params = {
        QueueUrl: 'http://sqs.region-1.amazonaws.com/queue',
        MessageBody: 'test'
      };

      strategy.sendMessage(params)
        .then((data) => {
          expect(data.MessageId).to.not.be.empty();
          expect(data.MessageId).to.be.a.string();
          done();
        })
        .catch(done);
    });
  });
});
