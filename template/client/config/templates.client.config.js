'use strict';

// Configuring the %PLURAL_CAPITALIZED% module
angular.module('%PLURAL%').run(['Menus',
  function (Menus) {
    // Add the %PLURAL% dropdown item
    Menus.addMenuItem('topbar', {
      title: '%PLURAL_CAPITALIZED%',
      state: '%PLURAL%',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', '%PLURAL%', {
      title: 'List %PLURAL_CAPITALIZED%',
      state: '%PLURAL%.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', '%PLURAL%', {
      title: 'Create %PLURAL_CAPITALIZED%',
      state: '%PLURAL%.create'
    });
  }
]);
