QUnit.module('JSHint | services/auth.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'services/auth.js should pass jshint.\nservices/auth.js: line 1, col 1, Use the function form of "use strict".\nservices/auth.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 10, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 22, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 31, col 18, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 38, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 39, col 35, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 49, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth.js: line 50, col 33, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\nservices/auth.js: line 51, col 15, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n12 errors');
});