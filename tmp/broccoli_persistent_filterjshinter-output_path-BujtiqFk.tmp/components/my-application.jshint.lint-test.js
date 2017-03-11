QUnit.module('JSHint | components/my-application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/my-application.js should pass jshint.\ncomponents/my-application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/my-application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/my-application.js: line 10, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
});
