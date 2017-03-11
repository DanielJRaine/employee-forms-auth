QUnit.module('JSHint | components/change-password-form.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/change-password-form.js should pass jshint.\ncomponents/change-password-form.js: line 1, col 1, Use the function form of "use strict".\ncomponents/change-password-form.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/change-password-form.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/change-password-form.js: line 11, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/change-password-form.js: line 15, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
});
