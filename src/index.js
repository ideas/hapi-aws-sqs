'use strict';

// Load external modules
const Joi = require('joi');

// Load internal modules
const Queue = require('./queue');

exports.register = function(server, options, next) {
  const schema = {
    queues: Joi.object().pattern(/-\w\d/, Joi.string().uri()).unknown(),
    options: Joi.object()
  };

  const result = Joi.validate(options, schema);

  if (result.error) {
    return next(result.error);
  }

  const queue = new Queue(result.value.queues, result.value.options);
  server.expose('queue', queue);

  next();
};

exports.register.attributes = {
  name: 'hapi-aws-sqs'
};
