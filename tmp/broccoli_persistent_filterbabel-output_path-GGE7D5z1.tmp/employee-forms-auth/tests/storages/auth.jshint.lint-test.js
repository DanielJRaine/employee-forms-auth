define('employee-forms-auth/tests/storages/auth.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | storages/auth.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'storages/auth.js should pass jshint.\nstorages/auth.js: line 1, col 1, Use the function form of "use strict".\nstorages/auth.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nstorages/auth.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});