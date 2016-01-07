'use strict';

// Load external modules
const Lab = require('lab');

// Load internal modules
const StubStrategy = require('../../src/strategies/stub.js');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('StubStrategy', () => {
  lab.describe('sendMessage', () => {
    lab.it('sends a message', (done) => {
      const strategy = new StubStrategy({ region: 'region-1' });

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
