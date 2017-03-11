define('employee-forms-auth/tests/routes/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/application.js: line 10, col 16, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 11, col 16, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 12, col 16, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 15, col 17, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 21, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/application.js: line 22, col 7, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/application.js: line 22, col 68, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n10 errors');
  });
});