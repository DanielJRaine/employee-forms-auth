define('employee-forms-auth/tests/routes/sign-in.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/sign-in.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/sign-in.js should pass jshint.\nroutes/sign-in.js: line 1, col 1, Use the function form of "use strict".\nroutes/sign-in.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-in.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-in.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-in.js: line 9, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/sign-in.js: line 14, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/sign-in.js: line 16, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-in.js: line 17, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/sign-in.js: line 18, col 15, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n9 errors');
  });
});