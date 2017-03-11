define('employee-forms-auth/tests/components/change-password-form.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/change-password-form.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/change-password-form.js should pass jshint.\ncomponents/change-password-form.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/change-password-form.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/change-password-form.js: line 10, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/change-password-form.js: line 14, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });
});