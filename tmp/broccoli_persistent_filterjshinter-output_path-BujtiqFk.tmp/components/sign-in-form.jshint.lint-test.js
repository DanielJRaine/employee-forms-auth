QUnit.module('JSHint | components/sign-in-form.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/sign-in-form.js should pass jshint.\ncomponents/sign-in-form.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/sign-in-form.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/sign-in-form.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/sign-in-form.js: line 12, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
});
