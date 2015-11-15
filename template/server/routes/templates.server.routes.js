'use strict';

/**
 * Module dependencies.
 */
var %PLURAL%Policy = require('../policies/%PLURAL%.server.policy'),
  %PLURAL% = require('../controllers/%PLURAL%.server.controller');

module.exports = function (app) {
  // %PLURAL_CAPITALIZED% collection routes
  app.route('/api/%PLURAL%').all(%PLURAL%Policy.isAllowed)
    .get(%PLURAL%.list)
    .post(%PLURAL%.create);

  // Single %MODEL% routes
  app.route('/api/%PLURAL%/:%MODEL%Id').all(%PLURAL%Policy.isAllowed)
    .get(%PLURAL%.read)
    .put(%PLURAL%.update)
    .delete(%PLURAL%.delete);

  // Finish by binding the %MODEL% middleware
  app.param('%MODEL%Id', %PLURAL%.%MODEL%ByID);
};
