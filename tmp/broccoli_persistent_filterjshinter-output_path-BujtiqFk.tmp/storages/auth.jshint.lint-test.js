QUnit.module('JSHint | storages/auth.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'storages/auth.js should pass jshint.\nstorages/auth.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nstorages/auth.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
