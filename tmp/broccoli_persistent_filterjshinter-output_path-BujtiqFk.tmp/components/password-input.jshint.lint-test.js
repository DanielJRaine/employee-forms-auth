QUnit.module('JSHint | components/password-input.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/password-input.js should pass jshint.\ncomponents/password-input.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/password-input.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
