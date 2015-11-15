'use strict';

// %PLURAL_CAPITALIZED% controller
angular.module('%PLURAL%').controller('%PLURAL_CAPITALIZED%Controller', ['$scope', '$stateParams', '$location', 'Authentication', '%PLURAL_CAPITALIZED%',
  function ($scope, $stateParams, $location, Authentication, %PLURAL_CAPITALIZED%) {
    $scope.authentication = Authentication;

    // Create new %CAPITALIZED%
    $scope.create = function () {
      // Create new %CAPITALIZED% object
      var %MODEL% = new %PLURAL_CAPITALIZED%({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      %MODEL%.$save(function (response) {
        $location.path('%PLURAL%/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing %CAPITALIZED%
    $scope.remove = function (%MODEL%) {
      if (%MODEL%) {
        %MODEL%.$remove();

        for (var i in $scope.%PLURAL%) {
          if ($scope.%PLURAL%[i] === %MODEL%) {
            $scope.%PLURAL%.splice(i, 1);
          }
        }
      } else {
        $scope.%MODEL%.$remove(function () {
          $location.path('%PLURAL%');
        });
      }
    };

    // Update existing %CAPITALIZED%
    $scope.update = function () {
      var %MODEL% = $scope.%MODEL%;

      %MODEL%.$update(function () {
        $location.path('%PLURAL%/' + %MODEL%._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of %PLURAL_CAPITALIZED%
    $scope.find = function () {
      $scope.%PLURAL% = %PLURAL_CAPITALIZED%.query();
    };

    // Find existing %CAPITALIZED%
    $scope.findOne = function () {
      $scope.%MODEL% = %PLURAL_CAPITALIZED%.get({
        %MODEL%Id: $stateParams.%MODEL%Id
      });
    };
  }
]);
