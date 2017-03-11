define('employee-forms-auth/tests/routes/sign-up.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/sign-up.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/sign-up.js should pass jshint.\nroutes/sign-up.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/sign-up.js: line 10, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 11, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 12, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-up.js: line 16, col 15, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n7 errors');
  });
});