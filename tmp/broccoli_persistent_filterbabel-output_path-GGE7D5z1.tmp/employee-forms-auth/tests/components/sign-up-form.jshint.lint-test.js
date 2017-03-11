define('employee-forms-auth/tests/components/sign-up-form.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/sign-up-form.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/sign-up-form.js should pass jshint.\ncomponents/sign-up-form.js: line 1, col 1, Use the function form of "use strict".\ncomponents/sign-up-form.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/sign-up-form.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/sign-up-form.js: line 11, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/sign-up-form.js: line 15, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
  });
});