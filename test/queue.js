'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');
const MockAWS = require('mock-aws');

// Load internal modules
const HapiAwsSqs = require('..');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.after((done) => {
  MockAWS.restore();
  done();
});

lab.describe('Queue', () => {
  lab.describe('sendMessage()', () => {
    lab.it('sends a message', (done) => {
      const server = new Hapi.Server();

      const plugin = {
        register: HapiAwsSqs,
        options: {
          queues: {
            test: 'https://sqs.us-east-1.amazonaws.com/012345678901/test'
          },
          options: {
            region: 'us-east-1',
            accessKeyId: '01234567890123456789',
            secretAccessKey: '0123456789012345678901234567890123456789'
          }
        }
      };

      server.register(plugin, (err) => {
        expect(err).to.not.exist();

        MockAWS.mock('SQS', 'sendMessage', {
          MessageId: '2c4fc1e3-9598-403c-b4f0-752aa8984800'
        });

        server.plugins['hapi-aws-sqs'].queue.sendMessage('test', { test: 'aws'})
          .then((data) => {
            expect(data.id).to.equal('2c4fc1e3-9598-403c-b4f0-752aa8984800');
            done();
          })
          .catch(done);
      });
    });
  });
});
