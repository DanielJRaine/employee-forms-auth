define('employee-forms-auth/tests/services/auth.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/auth.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/auth.js should pass jshint.\nservices/auth.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 9, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 21, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 30, col 18, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 37, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 38, col 35, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 48, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 49, col 33, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 50, col 15, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n11 errors');
  });
});