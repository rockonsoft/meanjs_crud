'use strict';

(function () {
  // %PLURAL_CAPITALIZED% Controller Spec
  describe('%PLURAL_CAPITALIZED% Controller Tests', function () {
    // Initialize global variables
    var %PLURAL_CAPITALIZED%Controller,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      %PLURAL_CAPITALIZED%,
      mock%CAPITALIZED%;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _%PLURAL_CAPITALIZED%_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      %PLURAL_CAPITALIZED% = _%PLURAL_CAPITALIZED%_;

      // create mock %MODEL%
      mock%CAPITALIZED% = new %PLURAL_CAPITALIZED%({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An %CAPITALIZED% about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the %PLURAL_CAPITALIZED% controller.
      %PLURAL_CAPITALIZED%Controller = $controller('%PLURAL_CAPITALIZED%Controller', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one %MODEL% object fetched from XHR', inject(function (%PLURAL_CAPITALIZED%) {
      // Create a sample %PLURAL% array that includes the new %MODEL%
      var sample%PLURAL_CAPITALIZED% = [mock%CAPITALIZED%];

      // Set GET response
      $httpBackend.expectGET('api/%PLURAL%').respond(sample%PLURAL_CAPITALIZED%);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.%PLURAL%).toEqualData(sample%PLURAL_CAPITALIZED%);
    }));

    it('$scope.findOne() should create an array with one %MODEL% object fetched from XHR using a %MODEL%Id URL parameter', inject(function (%PLURAL_CAPITALIZED%) {
      // Set the URL parameter
      $stateParams.%MODEL%Id = mock%CAPITALIZED%._id;

      // Set GET response
      $httpBackend.expectGET(/api\/%PLURAL%\/([0-9a-fA-F]{24})$/).respond(mock%CAPITALIZED%);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.%MODEL%).toEqualData(mock%CAPITALIZED%);
    }));

    describe('$scope.craete()', function () {
      var sample%CAPITALIZED%PostData;

      beforeEach(function () {
        // Create a sample %MODEL% object
        sample%CAPITALIZED%PostData = new %PLURAL_CAPITALIZED%({
          title: 'An %CAPITALIZED% about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An %CAPITALIZED% about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (%PLURAL_CAPITALIZED%) {
        // Set POST response
        $httpBackend.expectPOST('api/%PLURAL%', sample%CAPITALIZED%PostData).respond(mock%CAPITALIZED%);

        // Run controller functionality
        scope.create();
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the %MODEL% was created
        expect($location.path.calls.mostRecent().args[0]).toBe('%PLURAL%/' + mock%CAPITALIZED%._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/%PLURAL%', sample%CAPITALIZED%PostData).respond(400, {
          message: errorMessage
        });

        scope.create();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock %MODEL% in scope
        scope.%MODEL% = mock%CAPITALIZED%;
      });

      it('should update a valid %MODEL%', inject(function (%PLURAL_CAPITALIZED%) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/%PLURAL%\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update();
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/%PLURAL%/' + mock%CAPITALIZED%._id);
      }));

      it('should set scope.error to error response message', inject(function (%PLURAL_CAPITALIZED%) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/%PLURAL%\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(%MODEL%)', function () {
      beforeEach(function () {
        // Create new %PLURAL% array and include the %MODEL%
        scope.%PLURAL% = [mock%CAPITALIZED%, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/%PLURAL%\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mock%CAPITALIZED%);
      });

      it('should send a DELETE request with a valid %MODEL%Id and remove the %MODEL% from the scope', inject(function (%PLURAL_CAPITALIZED%) {
        expect(scope.%PLURAL%.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.%MODEL% = mock%CAPITALIZED%;

        $httpBackend.expectDELETE(/api\/%PLURAL%\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to %PLURAL%', function () {
        expect($location.path).toHaveBeenCalledWith('%PLURAL%');
      });
    });
  });
}());
