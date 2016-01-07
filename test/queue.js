'use strict';

// Load external modules
const Lab = require('lab');

// Load internal modules
const Queue = require('../src/queue');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('Queue', () => {
  lab.describe('constructor()', () => {
    lab.it('instantiates the sqs strategy by default', (done) => {
      const queue = new Queue();

      expect(queue._strategy.constructor.name).to.equal('SqsStrategy');
      done();
    });

    lab.it('instantiates the stub strategy when simulate option is true', (done) => {
      const queue = new Queue(null, null, true);

      expect(queue._strategy.constructor.name).to.equal('StubStrategy');
      done();
    });
  });
});
