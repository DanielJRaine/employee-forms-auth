define('employee-forms-auth/tests/components/hamburger-menu.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/hamburger-menu.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/hamburger-menu.js should pass jshint.\ncomponents/hamburger-menu.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/hamburger-menu.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});