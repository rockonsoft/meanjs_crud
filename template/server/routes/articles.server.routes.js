'use strict';

/**
 * Module dependencies.
 */
var %PLURAL%Policy = require('../policies/%PLURAL%.server.policy'),
  %PLURAL% = require('../controllers/%PLURAL%.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/%PLURAL%').all(%PLURAL%Policy.isAllowed)
    .get(%PLURAL%.list)
    .post(%PLURAL%.create);

  // Single article routes
  app.route('/api/%PLURAL%/:articleId').all(%PLURAL%Policy.isAllowed)
    .get(%PLURAL%.read)
    .put(%PLURAL%.update)
    .delete(%PLURAL%.delete);

  // Finish by binding the article middleware
  app.param('articleId', %PLURAL%.articleByID);
};
