'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  %CAPITALIZED% = mongoose.model('%CAPITALIZED%'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a %MODEL%
 */
exports.create = function (req, res) {
  var %MODEL% = new %CAPITALIZED%(req.body);
  %MODEL%.user = req.user;

  %MODEL%.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(%MODEL%);
    }
  });
};

/**
 * Show the current %MODEL%
 */
exports.read = function (req, res) {
  res.json(req.%MODEL%);
};

/**
 * Update a %MODEL%
 */
exports.update = function (req, res) {
  var %MODEL% = req.%MODEL%;

  %MODEL%.title = req.body.title;
  %MODEL%.content = req.body.content;

  %MODEL%.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(%MODEL%);
    }
  });
};

/**
 * Delete an %MODEL%
 */
exports.delete = function (req, res) {
  var %MODEL% = req.%MODEL%;

  %MODEL%.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(%MODEL%);
    }
  });
};

/**
 * List of %PLURAL_CAPITALIZED%
 */
exports.list = function (req, res) {
  %CAPITALIZED%.find().sort('-created').populate('user', 'displayName').exec(function (err, %PLURAL%) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(%PLURAL%);
    }
  });
};

/**
 * %CAPITALIZED% middleware
 */
exports.%MODEL%ByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: '%CAPITALIZED% is invalid'
    });
  }

  %CAPITALIZED%.findById(id).populate('user', 'displayName').exec(function (err, %MODEL%) {
    if (err) {
      return next(err);
    } else if (!%MODEL%) {
      return res.status(404).send({
        message: 'No %MODEL% with that identifier has been found'
      });
    }
    req.%MODEL% = %MODEL%;
    next();
  });
};
