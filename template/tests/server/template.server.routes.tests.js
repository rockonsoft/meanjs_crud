'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  %CAPITALIZED% = mongoose.model('%CAPITALIZED%'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, %MODEL%;

/**
 * %CAPITALIZED% routes tests
 */
describe('%CAPITALIZED% CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'password'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new %MODEL%
    user.save(function () {
      %MODEL% = {
        title: '%CAPITALIZED% Title',
        content: '%CAPITALIZED% Content'
      };

      done();
    });
  });

  it('should be able to save an %MODEL% if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new %MODEL%
        agent.post('/api/%PLURAL%')
          .send(%MODEL%)
          .expect(200)
          .end(function (%MODEL%SaveErr, %MODEL%SaveRes) {
            // Handle %MODEL% save error
            if (%MODEL%SaveErr) {
              return done(%MODEL%SaveErr);
            }

            // Get a list of %PLURAL%
            agent.get('/api/%PLURAL%')
              .end(function (%PLURAL%GetErr, %PLURAL%GetRes) {
                // Handle %MODEL% save error
                if (%PLURAL%GetErr) {
                  return done(%PLURAL%GetErr);
                }

                // Get %PLURAL% list
                var %PLURAL% = %PLURAL%GetRes.body;

                // Set assertions
                (%PLURAL%[0].user._id).should.equal(userId);
                (%PLURAL%[0].title).should.match('%CAPITALIZED% Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an %MODEL% if not logged in', function (done) {
    agent.post('/api/%PLURAL%')
      .send(%MODEL%)
      .expect(403)
      .end(function (%MODEL%SaveErr, %MODEL%SaveRes) {
        // Call the assertion callback
        done(%MODEL%SaveErr);
      });
  });

  it('should not be able to save an %MODEL% if no title is provided', function (done) {
    // Invalidate title field
    %MODEL%.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new %MODEL%
        agent.post('/api/%PLURAL%')
          .send(%MODEL%)
          .expect(400)
          .end(function (%MODEL%SaveErr, %MODEL%SaveRes) {
            // Set message assertion
            (%MODEL%SaveRes.body.message).should.match('Title cannot be blank');

            // Handle %MODEL% save error
            done(%MODEL%SaveErr);
          });
      });
  });

  it('should be able to update an %MODEL% if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new %MODEL%
        agent.post('/api/%PLURAL%')
          .send(%MODEL%)
          .expect(200)
          .end(function (%MODEL%SaveErr, %MODEL%SaveRes) {
            // Handle %MODEL% save error
            if (%MODEL%SaveErr) {
              return done(%MODEL%SaveErr);
            }

            // Update %MODEL% title
            %MODEL%.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing %MODEL%
            agent.put('/api/%PLURAL%/' + %MODEL%SaveRes.body._id)
              .send(%MODEL%)
              .expect(200)
              .end(function (%MODEL%UpdateErr, %MODEL%UpdateRes) {
                // Handle %MODEL% update error
                if (%MODEL%UpdateErr) {
                  return done(%MODEL%UpdateErr);
                }

                // Set assertions
                (%MODEL%UpdateRes.body._id).should.equal(%MODEL%SaveRes.body._id);
                (%MODEL%UpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of %PLURAL% if not signed in', function (done) {
    // Create new %MODEL% model instance
    var %MODEL%Obj = new %CAPITALIZED%(%MODEL%);

    // Save the %MODEL%
    %MODEL%Obj.save(function () {
      // Request %PLURAL%
      request(app).get('/api/%PLURAL%')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single %MODEL% if not signed in', function (done) {
    // Create new %MODEL% model instance
    var %MODEL%Obj = new %CAPITALIZED%(%MODEL%);

    // Save the %MODEL%
    %MODEL%Obj.save(function () {
      request(app).get('/api/%PLURAL%/' + %MODEL%Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', %MODEL%.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single %MODEL% with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/%PLURAL%/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', '%CAPITALIZED% is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single %MODEL% which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent %MODEL%
    request(app).get('/api/%PLURAL%/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No %MODEL% with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an %MODEL% if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new %MODEL%
        agent.post('/api/%PLURAL%')
          .send(%MODEL%)
          .expect(200)
          .end(function (%MODEL%SaveErr, %MODEL%SaveRes) {
            // Handle %MODEL% save error
            if (%MODEL%SaveErr) {
              return done(%MODEL%SaveErr);
            }

            // Delete an existing %MODEL%
            agent.delete('/api/%PLURAL%/' + %MODEL%SaveRes.body._id)
              .send(%MODEL%)
              .expect(200)
              .end(function (%MODEL%DeleteErr, %MODEL%DeleteRes) {
                // Handle %MODEL% error error
                if (%MODEL%DeleteErr) {
                  return done(%MODEL%DeleteErr);
                }

                // Set assertions
                (%MODEL%DeleteRes.body._id).should.equal(%MODEL%SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an %MODEL% if not signed in', function (done) {
    // Set %MODEL% user
    %MODEL%.user = user;

    // Create new %MODEL% model instance
    var %MODEL%Obj = new %CAPITALIZED%(%MODEL%);

    // Save the %MODEL%
    %MODEL%Obj.save(function () {
      // Try deleting %MODEL%
      request(app).delete('/api/%PLURAL%/' + %MODEL%Obj._id)
        .expect(403)
        .end(function (%MODEL%DeleteErr, %MODEL%DeleteRes) {
          // Set message assertion
          (%MODEL%DeleteRes.body.message).should.match('User is not authorized');

          // Handle %MODEL% error error
          done(%MODEL%DeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      %CAPITALIZED%.remove().exec(done);
    });
  });
});
