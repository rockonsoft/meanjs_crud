'use strict';

describe('Articles E2E Tests:', function () {
  describe('Test %PLURAL% page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/%PLURAL%');
      expect(element.all(by.repeater('article in %PLURAL%')).count()).toEqual(0);
    });
  });
});
