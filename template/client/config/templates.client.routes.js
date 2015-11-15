'use strict';

// Setting up route
angular.module('%PLURAL%').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
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
        templateUrl: 'modules/%PLURAL%/views/create-%PLURAL%.client.view.html'
      })
      .state('%PLURAL%.view', {
        url: '/:articleId',
        templateUrl: 'modules/%PLURAL%/views/view-%PLURAL%.client.view.html'
      })
      .state('%PLURAL%.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/%PLURAL%/views/edit-%PLURAL%.client.view.html'
      });
  }
]);
