'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');

// Load internal modules
const HapiAwsSqs = require('..');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

lab.describe('HapiAwsSqs', () => {
  lab.it('registers', (done) => {
    const server = new Hapi.Server();

    const plugin = {
      register: HapiAwsSqs
    };

    server.register(plugin, (err) => {
      expect(err).to.not.exist();
      expect(server.plugins['hapi-aws-sqs'].queue).to.be.an.object();
      done();
    });
  });
});
