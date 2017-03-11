define('employee-forms-auth/tests/components/password-confirmation-input.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/password-confirmation-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/password-confirmation-input.js should pass jshint.\ncomponents/password-confirmation-input.js: line 1, col 1, Use the function form of "use strict".\ncomponents/password-confirmation-input.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/password-confirmation-input.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});