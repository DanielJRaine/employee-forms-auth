define('employee-forms-auth/tests/components/password-input.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/password-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/password-input.js should pass jshint.\ncomponents/password-input.js: line 1, col 1, Use the function form of "use strict".\ncomponents/password-input.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/password-input.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});