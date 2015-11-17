'use strict';

// Setting up route
angular.module('%PLURAL%').config(['$stateProvider',
  function ($stateProvider) {
    // %PLURAL_CAPITALIZED% state routing
    $stateProvider
      .state('%PLURAL%', {
        abstract: true,
        url: '/%PLURAL%',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('%PLURAL%.list', {
        url: '',
        templateUrl: 'modules/%PLURAL%/views/list-%PLURAL%.client.view.html'
      })
      .state('%PLURAL%.create', {
        url: '/create',
        templateUrl: 'modules/%PLURAL%/views/create-%MODEL%.client.view.html'
      })
      .state('%PLURAL%.view', {
        url: '/:%MODEL%Id',
        templateUrl: 'modules/%PLURAL%/views/view-%MODEL%.client.view.html'
      })
      .state('%PLURAL%.edit', {
        url: '/:%MODEL%Id/edit',
        templateUrl: 'modules/%PLURAL%/views/edit-%MODEL%.client.view.html'
      });
  }
]);
