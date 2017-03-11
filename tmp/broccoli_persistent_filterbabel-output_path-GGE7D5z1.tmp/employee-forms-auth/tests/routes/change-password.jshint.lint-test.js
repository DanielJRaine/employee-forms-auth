define('employee-forms-auth/tests/routes/change-password.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/change-password.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/change-password.js should pass jshint.\nroutes/change-password.js: line 1, col 1, Use the function form of "use strict".\nroutes/change-password.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 9, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/change-password.js: line 11, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 12, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 13, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 17, col 14, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/change-password.js: line 20, col 15, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n9 errors');
  });
});