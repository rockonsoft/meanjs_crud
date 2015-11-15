'use strict';

//%PLURAL_CAPITALIZED% service used for communicating with the %PLURAL% REST endpoints
angular.module('%PLURAL%').factory('%PLURAL_CAPITALIZED%', ['$resource',
  function ($resource) {
    return $resource('api/%PLURAL%/:%MODEL%Id', {
      %MODEL%Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
